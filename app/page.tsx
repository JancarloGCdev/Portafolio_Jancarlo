"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GuidedTour } from "@/components/GuidedTour";
import { HUDTabs } from "@/components/HUDTabs";
import { LiveLogs } from "@/components/LiveLogs";
import { NodeModal } from "@/components/NodeModal";
import { QuickAccess } from "@/components/QuickAccess";
import { TerminalIntro } from "@/components/TerminalIntro";
import { ThreatMap } from "@/components/ThreatMap";
import type { TopologyNodeId } from "@/lib/mapData";
import { usePortfolio } from "@/components/portfolio-locale-provider";

type Phase = "intro" | "main";

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intro");

  if (phase === "intro") {
    return (
      <main className="relative min-h-[100svh] overflow-hidden">
        <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_-10%,rgba(34,211,238,0.08),transparent_45%),radial-gradient(circle_at_90%_0%,rgba(74,222,128,0.06),transparent_40%)]" />
        <TerminalIntro onEnterMain={() => setPhase("main")} />
      </main>
    );
  }

  return <PortfolioDesk />;
}

function PortfolioDesk() {
  const { labelForNodeId, copy, guidedTourSteps } = usePortfolio();
  const pl = copy.pageLogs;
  const [logs, setLogs] = useState<string[]>(() => [...pl.initialLines]);
  const [panel, setPanel] = useState<{ id: string | null; anchor?: string | null }>({ id: null });
  const [tourDim, setTourDim] = useState(false);
  const tourStepTimerRef = useRef<number | null>(null);
  const tourAbortRef = useRef<{ abort: () => void } | null>(null);

  const labelFor = useCallback((id: string) => labelForNodeId(id), [labelForNodeId]);

  const pushLog = useCallback((line: string) => {
    setLogs((prev) => [...prev, line]);
  }, []);

  useEffect(() => {
    const messages = [...pl.rotating];
    let index = 0;
    const id = window.setInterval(() => {
      pushLog(messages[index % messages.length]);
      index += 1;
    }, 13_200);
    return () => window.clearInterval(id);
  }, [pl.rotating, pushLog]);

  const clearTourStepTimer = useCallback(() => {
    if (tourStepTimerRef.current != null) {
      window.clearTimeout(tourStepTimerRef.current);
      tourStepTimerRef.current = null;
    }
  }, []);

  const closePanel = useCallback(() => setPanel({ id: null }), []);

  const openPanel = useCallback(
    (id: string, anchor?: string | null) => {
      setPanel({ id, anchor });
      pushLog(`${pl.opening} ${labelFor(id)}`);
    },
    [labelFor, pl.opening, pushLog],
  );

  const handleTourAbort = useCallback(() => {
    clearTourStepTimer();
    setTourDim(false);
    closePanel();
    pushLog(pl.tourCanceled);
  }, [clearTourStepTimer, closePanel, pl.tourCanceled, pushLog]);

  /** Entre pasos (>0) cerramos modal un instante para que parezca un clic nuevo en el mapa. */
  const TOUR_STEP_REOPEN_MS = 420;

  const handleTourStep = useCallback(
    (step: { nodeId: string; anchorId?: string; logMessage?: string }, index: number) => {
      const applyStep = () => {
        setTourDim(true);
        openPanel(step.nodeId, step.anchorId ?? null);
        if (step.logMessage) {
          pushLog(step.logMessage);
        }
        pushLog(`${pl.tourNowPrefix} ${labelFor(step.nodeId)}`);
      };

      clearTourStepTimer();

      if (index === 0) {
        applyStep();
        return;
      }

      closePanel();
      setTourDim(false);
      tourStepTimerRef.current = window.setTimeout(() => {
        tourStepTimerRef.current = null;
        applyStep();
      }, TOUR_STEP_REOPEN_MS);
    },
    [clearTourStepTimer, closePanel, labelFor, openPanel, pl.tourNowPrefix, pushLog],
  );

  const handleTourFinish = useCallback(() => {
    clearTourStepTimer();
    setTourDim(false);
  }, [clearTourStepTimer]);

  const dismissModal = useCallback(() => {
    clearTourStepTimer();
    closePanel();
    tourAbortRef.current?.abort();
  }, [clearTourStepTimer, closePanel]);

  const selectNodeFromMap = useCallback(
    (id: string) => {
      clearTourStepTimer();
      tourAbortRef.current?.abort();
      setTourDim(false);
      openPanel(id, null);
    },
    [clearTourStepTimer, openPanel],
  );

  useEffect(() => () => clearTourStepTimer(), [clearTourStepTimer]);

  const panelAnchor = panel.anchor ?? undefined;

  return (
    <main className="relative min-h-[100svh] w-full min-w-0 max-w-[100vw] overflow-x-clip pb-28">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_10%_-10%,rgba(34,211,238,0.08),transparent_45%),radial-gradient(circle_at_90%_10%,rgba(74,222,128,0.05),transparent_35%)]" />
      <div className="pointer-events-none fixed inset-0 crt-scan opacity-[0.14]" />

      <HUDTabs activeNodeId={panel.id} onSelect={(id) => selectNodeFromMap(id)} />
      <QuickAccess />

      <GuidedTour
        disabled={false}
        abortRef={tourAbortRef}
        onStep={(step, index) => handleTourStep(step, index)}
        onComplete={handleTourFinish}
        onCancel={handleTourAbort}
      />

      <ThreatMap onSelectNode={selectNodeFromMap} highlightNodeId={panel.id} tourActive={tourDim} />

      <LiveLogs logs={logs} />

      <NodeModal
        nodeId={panel.id as TopologyNodeId | null}
        anchorId={panelAnchor ?? null}
        onClose={dismissModal}
        guidedTourSteps={guidedTourSteps}
        onOpenSection={(id, anchor) => {
          clearTourStepTimer();
          tourAbortRef.current?.abort();
          setTourDim(false);
          openPanel(id, anchor);
        }}
      />
    </main>
  );
}


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
import { labelForNodeId } from "@/lib/mapData";

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
  const [logs, setLogs] = useState<string[]>(() => [
    "Mapa listo: toca cualquier punto para ver el detalle de esa área.",
    "Contenido pensado para evaluadores de talento y clientes: sin requisitos previos.",
    'Consejo: puedes usar el recorrido guiado en la esquina inferior derecha para ver el contenido en orden.',
  ]);
  const [panel, setPanel] = useState<{ id: string | null; anchor?: string | null }>({ id: null });
  const [tourDim, setTourDim] = useState(false);
  const tourStepTimerRef = useRef<number | null>(null);
  const tourAbortRef = useRef<{ abort: () => void } | null>(null);

  const labelFor = useCallback((id: string) => labelForNodeId(id), []);

  const pushLog = useCallback((line: string) => {
    setLogs((prev) => [...prev, line]);
  }, []);

  useEffect(() => {
    const messages = [
      "Cualquier sección del mapa se abre con un toque o clic en el punto correspondiente.",
      "Esta página no recoge datos personales: es una vitrina informativa.",
      "La banda inferior resume la última navegación como referencia rápida.",
      "Si te interesa la formación académica y certificaciones, visita el apartado correspondiente.",
      "Puedes compartir este enlace con quien evalúe mi perfil o una propuesta.",
      "Los laboratorios de seguridad documentan cómo abordo análisis y visibilidad.",
      "Trabajo con lenguaje claro para equipos de negocio y para perfiles técnicos.",
    ];
    let index = 0;
    const id = window.setInterval(() => {
      pushLog(messages[index % messages.length]);
      index += 1;
    }, 13_200);
    return () => window.clearInterval(id);
  }, [pushLog]);

  const openPanel = useCallback(
    (id: string, anchor?: string | null) => {
      setPanel({ id, anchor });
      pushLog(`Abriendo: ${labelFor(id)}`);
    },
    [labelFor, pushLog],
  );

  const closePanel = useCallback(() => setPanel({ id: null }), []);

  const clearTourStepTimer = useCallback(() => {
    if (tourStepTimerRef.current != null) {
      window.clearTimeout(tourStepTimerRef.current);
      tourStepTimerRef.current = null;
    }
  }, []);

  const handleTourAbort = useCallback(() => {
    clearTourStepTimer();
    setTourDim(false);
    closePanel();
    pushLog("Recorrido detenido: continúas explorando el mapa.");
  }, [clearTourStepTimer, closePanel, pushLog]);

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
        pushLog(`Recorrido · ahora: ${labelFor(step.nodeId)}`);
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
    [clearTourStepTimer, closePanel, labelFor, openPanel, pushLog],
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
    <main className="relative min-h-[100svh] overflow-x-hidden pb-28">
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

      <NodeModal nodeId={panel.id as TopologyNodeId | null} anchorId={panelAnchor ?? null} onClose={dismissModal} />
    </main>
  );
}


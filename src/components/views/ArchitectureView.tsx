import React, { useState } from 'react';
import {
  Network,
  Server,
  Database,
  Cpu,
  Layers,
  ArrowDown,
  ExternalLink,
  Code2,
  CheckCircle2,
  Lock,
  Globe
} from 'lucide-react';

interface ArchNode {
  id: string;
  name: string;
  subtitle: string;
  tech: string[];
  protocol: string;
  role: string;
  details: string;
  futureRoadmap: string;
}

export const ArchitectureView: React.FC = () => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('frontend');

  const nodes: ArchNode[] = [
    {
      id: 'user',
      name: 'Client / User Layer',
      subtitle: 'Analyst & Researcher Persona',
      tech: ['Modern Browser', 'Desktop Viewport (1440px)', 'Responsive Mobile Touch'],
      protocol: 'HTTPS / TLS 1.3',
      role: 'User interaction, multi-dimensional cohort filtering, chart studio manipulation, and report compilation.',
      details: 'Dispatches query events and filter updates, receiving optimized reactive JSON structures.',
      futureRoadmap: 'WebAuthn and Role-Based Access Control (RBAC) user authorization.'
    },
    {
      id: 'frontend',
      name: 'React Frontend',
      subtitle: 'Interactive SPA Application',
      tech: ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Custom SVG Visualization Engine'],
      protocol: 'REST / Client-Side State Router',
      role: 'Single-page reactive rendering, real-time client-side filter computation, zero-latency SVG chart updates.',
      details: 'Modular functional components with TypeScript strict mode, avoiding heavy external chart library lock-in.',
      futureRoadmap: 'PWA offline synchronization and Web Workers for parallel multi-cohort filtering.'
    },
    {
      id: 'api',
      name: 'REST API Gateway',
      subtitle: 'Routing & Payload Serializer',
      tech: ['Express 4.21', 'JSON Schemas', 'CORS / Security Middleware'],
      protocol: 'HTTP/2 RESTful JSON Endpoints',
      role: 'Receives `/api/datasets`, `/api/clean`, `/api/stats`, `/api/correlation`, `/api/compare` requests.',
      details: 'Validates multipart uploads (CSV/JSON), sanitizes input queries, and dispatches to processing layer.',
      futureRoadmap: 'GraphQL federation layer or gRPC microservices for ultra-high-throughput cohort queries.'
    },
    {
      id: 'appserver',
      name: 'Application Server',
      subtitle: 'Node.js Runtime Host',
      tech: ['Node.js 22 LTS', 'TSX Runtime', 'Asynchronous Event Loop'],
      protocol: 'Internal Node Process IPC',
      role: 'Manages analytical job queues, streaming file uploads, memory caches, and session lifecycles.',
      details: 'Orchestrates data pipeline tasks and routes compute-intensive routines.',
      futureRoadmap: 'Containerized deployment via Docker and Cloud Run with scale-to-zero capabilities.'
    },
    {
      id: 'processing',
      name: 'Data Processing Engine',
      subtitle: 'Vectorized Tabular Cleaner',
      tech: ['Pandas-Compatible DataFrames', 'TypeScript Vector Engine', 'Python Bridge Ready'],
      protocol: 'In-Memory Arrow / Matrix Buffer',
      role: 'Schema validation, missing value detection, IQR outlier bounds calculation, and deduplication.',
      details: 'Structured so a Python Pandas / NumPy backend can replace the TypeScript processing routines seamlessly.',
      futureRoadmap: 'Direct Python FastAPI integration with Polars / Pandas for multi-gigabyte genomics VCF files.'
    },
    {
      id: 'analytics',
      name: 'Analytics Engine',
      subtitle: 'Parametric & Statistical Core',
      tech: ['Pearson Covariance Engine', 'Descriptive Stats', 'Tukey Boxplot Math'],
      protocol: 'Deterministic Vector Ops',
      role: 'Pearson r correlation matrix derivation, p-value calculations, quartile binning, automated insight heuristics.',
      details: 'Calculates bivariate linear regression coefficients and multi-feature demographic distributions.',
      futureRoadmap: 'Scikit-learn clustering (PCA, t-SNE) and machine learning risk stratification modules.'
    },
    {
      id: 'database',
      name: 'Storage & Database Layer',
      subtitle: 'Relational Record Store',
      tech: ['PostgreSQL Ready Schema', 'In-Memory Vector Cache', 'Drizzle / Prisma ORM Compatible'],
      protocol: 'PostgreSQL Wire Protocol / JSON',
      role: 'Persistent storage for patient records, uploaded cohort files, quality audit logs, and saved visualizations.',
      details: 'Prototype utilizes an in-memory transactional store architected with relational SQL constraints ready for Postgres.',
      futureRoadmap: 'Provision Cloud SQL PostgreSQL instance with indexing on disorder, age, and biomarker columns.'
    }
  ];

  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[1];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-6xl mx-auto">
      {/* Title */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            System Architecture
          </h1>
          <span className="text-[11px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded font-medium">
            FULL-STACK BLUEPRINT
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Architectural schematic of GeneScope from client UI to the Pandas-compatible processing engine and PostgreSQL storage.
        </p>
      </div>

      {/* Main Visual Diagram and Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Interactive Diagram Flowchart (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Interactive Architectural Flow
            </span>
            <span className="text-[10px] font-mono text-slate-400">CLICK ANY LAYER TO INSPECT</span>
          </div>

          <div className="flex flex-col items-center gap-2 py-2">
            {nodes.map((node, index) => {
              const isSelected = selectedNodeId === node.id;
              return (
                <React.Fragment key={node.id}>
                  {/* Node Box */}
                  <div
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`w-full max-w-md p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/90 border-blue-600 shadow-sm ring-2 ring-blue-500/20'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs ${
                            isSelected
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-slate-700 border border-slate-200'
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">{node.name}</h4>
                          <p className="text-[10px] text-slate-500 font-mono">{node.subtitle}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 font-semibold">
                        {node.protocol.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Flow Arrow */}
                  {index < nodes.length - 1 && (
                    <div className="flex items-center justify-center text-slate-300 my-0.5">
                      <ArrowDown className="w-4 h-4 text-blue-500" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Node Detailed Inspector (5 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700">
                  Node Specification
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedNode.name}
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                Layer {nodes.findIndex((n) => n.id === selectedNode.id) + 1} of 7
              </span>
            </div>

            {/* Technologies */}
            <div>
              <span className="text-[11px] font-semibold text-slate-700 block mb-1.5">
                Core Technologies &amp; Frameworks
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedNode.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-1 bg-slate-100 border border-slate-200 rounded text-xs font-mono text-slate-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Role & Protocol */}
            <div className="space-y-2 text-xs">
              <div>
                <span className="font-semibold text-slate-700 block mb-0.5">Communication Protocol:</span>
                <span className="font-mono text-blue-700 font-semibold">{selectedNode.protocol}</span>
              </div>
              <div>
                <span className="font-semibold text-slate-700 block mb-0.5">System Responsibility:</span>
                <p className="text-slate-600 leading-relaxed">{selectedNode.role}</p>
              </div>
              <div>
                <span className="font-semibold text-slate-700 block mb-0.5">Internal Mechanism:</span>
                <p className="text-slate-600 leading-relaxed">{selectedNode.details}</p>
              </div>
            </div>

            {/* Migration / Future Roadmap */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-lg space-y-1">
              <span className="text-[11px] font-mono font-bold text-teal-800 uppercase tracking-wider block">
                Production Migration Roadmap
              </span>
              <p className="text-xs text-slate-700 leading-relaxed">
                {selectedNode.futureRoadmap}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Modular decoupling: Clean boundaries</span>
            <span className="text-teal-600 font-semibold">Postgres Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

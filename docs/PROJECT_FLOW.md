# PAIMANA AI — Project Flow

Predictive Infrastructure Risk & Early Warning System
Smart India Hackathon 2026 | SIH26103 | MoSPI

---

## End-to-End System Flow

```mermaid
flowchart LR
    A[Project Data<br/>cost / schedule / progress] --> B[AI Risk Engine]
    B --> C[Risk Score & Drivers]
    B --> D[Early Warnings]
    C --> E[MoSPI Portfolio View]
    D --> E
    E --> F[Monitor & Prioritise]
    F --> G[Alerts to Ministry]
    G --> H[Ministry Updates<br/>progress / cost / status]
    H --> A
    E --> I[Public Transparency View]
```

### Pipeline

1. **Ingest** — Project data (cost, physical progress, schedules) enters the system.
2. **Predict** — AI engine computes risk score, cost risk and time risk, and generates risk drivers.
3. **Warn** — Critical/high signals are raised as early warnings.
4. **Monitor** — MoSPI / IPMD officer reviews the portfolio and prioritises high-risk projects.
5. **Act** — Ministry / agency updates project progress, expenditure, status and completion dates (via the edit modal).
6. **Loop** — Updated data feeds back into the risk engine for re-evaluation.
7. **Publish** — Public dashboard provides a read-only transparency view.

---

## App / Navigation Flow

```mermaid
flowchart TD
    LANDING[Landing Page<br/>select role] --> MOSPI[MoSPI / IPMD Officer]
    LANDING --> MIN[Ministry / Agency]
    LANDING --> PUB[Public User]

    MOSPI --> MO1[/mospi/overview/]
    MOSPI --> MO2[/mospi/projects/ + project detail/]
    MOSPI --> MO3[/mospi/risk-intelligence/]
    MOSPI --> MO4[/mospi/early-warnings/]
    MOSPI --> MO5[/mospi/analytics/ + benchmarks/]
    MOSPI --> MO6[/mospi/assistant/]

    MIN --> MN1[/ministry/projects/ → ProjectHealth/]
    MIN --> MN2[/ministry/warnings/]
    MIN --> MN3[/ministry/benchmarks/]
    MIN --> MN4[/ministry/assistant/]
    MN1 -- "Update Progress modal" --> EDIT[Save → ProjectsContext → localStorage<br/>visible across all portals]

    PUB --> PU1[/public/dashboard/]
    PUB --> PU2[/public/projects/ + detail/]
    PUB --> PU3[/public/analytics/]
```

### Key Flows

- **Landing** — role cards navigate to each portal's starting page (`/mospi/overview`, `/ministry/projects`, `/public/dashboard`).
- **Role switching** — header dropdown updates both the route and the sidebar navigation.
- **Ministry edit path** — `My Projects` → click project → `Update Progress` → modal → Save → data persists in `ProjectsContext` + localStorage → reflected in MoSPI and public views as well.
- **Routing** — all routes live under `BrowserRouter` in `src/App.jsx`; `/mospi`, `/ministry`, and `/public` redirect to their default dashboards.

---

## Role Permissions

| Role                | Portal   | Views                                                              | Edit Rights                          |
| ------------------- | -------- | ------------------------------------------------------------------ | ------------------------------------ |
| MoSPI / IPMD Officer| `/mospi` | Overview, Projects+Detail, Risk Intelligence, Early Warnings, Analytics, Benchmarks, Assistant | Read-only                           |
| Ministry / Agency   | `/ministry` | Projects, Project Health, Warnings, Benchmarks, Assistant      | Update progress, costs, status, dates |
| Public User         | `/public` | Dashboard, Projects+Detail, Analytics                              | Read-only                            |

> Risk score, risk level and risk drivers are **not** user-editable.
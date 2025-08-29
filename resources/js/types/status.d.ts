export interface User {
    id: number;
    name: string;
    email: string;
    role: Role | null;
}

export interface Role {
    id: number;
    name: string;
    description: string | null;
    permissions: string[];
}

export interface Component {
    id: number;
    name: string;
    status: ComponentStatus;
    display_order: number;
    group_id: number;
}

export interface ComponentGroup {
    id: number;
    name: string;
    display_order: number;
    collapsed_by_default: boolean;
    status: ComponentStatus;
    components: Component[];
}

export interface Incident {
    id: number;
    title: string;
    status: IncidentStatus;
    impact: IncidentImpact;
    impact_description: string | null;
    root_cause: string | null;
    duration: string;
    created_at: string;
    resolved_at: string | null;
    is_resolved: boolean;
    affected_components: Component[];
    updates: IncidentUpdate[];
}

export interface IncidentUpdate {
    id: number;
    message: string;
    status: IncidentStatus;
    timestamp: string;
    incident_id: number;
}

export interface MaintenanceWindow {
    id: number;
    title: string;
    description: string;
    start_time: string;
    end_time: string;
    is_active: boolean;
    is_upcoming: boolean;
    affected_components: Component[];
    updates: MaintenanceUpdate[];
}

export interface MaintenanceUpdate {
    id: number;
    message: string;
    timestamp: string;
    maintenance_id: number;
}

export interface AuditLog {
    id: number;
    timestamp: string;
    username: string;
    action: string;
    details: string;
}

export interface Automation {
    id: number;
    name: string;
    target_status: ComponentStatus;
    components: Component[];
}

export interface SiteSetting {
    id: number;
    key: string;
    value: string;
}

export interface StatusInfo {
    label: string;
    color: string;
    icon: string;
    description: string;
}

export type ComponentStatus = 
    | 'operational'
    | 'degraded_performance'
    | 'partial_outage'
    | 'major_outage'
    | 'under_maintenance';

export type IncidentStatus = 
    | 'investigating'
    | 'identified'
    | 'monitoring'
    | 'resolved';

export type IncidentImpact = 
    | 'none'
    | 'minor'
    | 'major'
    | 'critical';

export interface GroupedIncidents {
    date: string;
    formatted_date: string;
    incidents: Incident[];
}

export interface PaginatedData<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
}

export interface DashboardStats {
    total_components: number;
    total_groups: number;
    active_incidents: number;
    resolved_incidents: number;
    upcoming_maintenance: number;
}
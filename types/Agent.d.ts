export interface AgentPulseResponse extends OnlyStatus {
  current_time?: number;
  expire_at?: number;
  client?: string;
}
export interface OnlyStatus {
  status: 'active' | 'inactive';
}

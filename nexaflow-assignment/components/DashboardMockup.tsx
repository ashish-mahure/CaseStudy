export default function DashboardMockup() {
  return <div className="dashboard" aria-label="Operations overview dashboard mockup">
    <div className="dashboard-bar"><span/><span/><span/></div>
    <div className="dashboard-body">
      <div className="dashboard-heading"><strong>Operations Overview</strong><small>Monday, August 17</small></div>
      <div className="stat-grid">
        <div className="stat-card purple"><span>Active workflows</span><b>128</b></div>
        <div className="stat-card blue"><span>Time saved</span><b>42%</b></div>
        <div className="stat-card green"><span>Tasks automated</span><b>3.8k</b></div>
      </div>
      <div className="activity-title">Weekly activity</div>
      <div className="chart"><svg viewBox="0 0 530 160" preserveAspectRatio="none"><polyline points="10,145 60,100 110,120 160,45 210,80 260,20 310,42 360,0 410,25 460,-15 520,5" fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round"/></svg></div>
    </div>
  </div>;
}

import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { HousekeepingTask, TaskPriority, TaskStatus } from '../../types';
import {
  ClipboardList,
  Sparkles,
  CheckCircle,
  Play,
  AlertTriangle,
  Clock,
  Wrench,
  Plus,
  Send,
  BedDouble,
  Check
} from 'lucide-react';

export const HousekeepingDashboard: React.FC = () => {
  const { tasks, updateTaskStatus, reportIssue, rooms } = useHotel();

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed' | 'blocked'>('all');

  // Issue modal
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [issueRoom, setIssueRoom] = useState('101');
  const [issueDescription, setIssueDescription] = useState('');
  const [issuePriority, setIssuePriority] = useState<'urgent' | 'high' | 'medium'>('high');
  const [issueSuccess, setIssueSuccess] = useState(false);

  const filteredTasks = tasks.filter(t => {
    if (statusFilter === 'all') return true;
    return t.status === statusFilter;
  });

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'urgent':
        return <span className="badge badge-danger">Urgent Turnover</span>;
      case 'high':
        return <span className="badge badge-warning">High Priority</span>;
      case 'medium':
        return <span className="badge badge-sapphire">Medium Priority</span>;
      default:
        return <span className="badge badge-petal">Normal Standard</span>;
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'pending':
        return <span className="badge badge-warning">Pending</span>;
      case 'in_progress':
        return <span className="badge badge-sapphire">In Progress</span>;
      case 'completed':
        return <span className="badge badge-success">Completed</span>;
      case 'blocked':
        return <span className="badge badge-danger">Blocked (DND)</span>;
    }
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issueDescription) return;

    reportIssue(issueRoom, issueDescription, issuePriority);
    setIssueSuccess(true);
    setIssueDescription('');

    setTimeout(() => {
      setReportModalOpen(false);
      setIssueSuccess(false);
    }, 1400);
  };

  return (
    <div>
      {/* Top Controls Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem'
        }}
      >
        <div>
          <span className="section-eyebrow">HOUSEKEEPING OPERATIONS</span>
          <h2 style={{ fontSize: '1.45rem', color: 'var(--color-midnight)', margin: 0 }}>
            Assigned Cleaning & Turnover Board
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
            Mark rooms cleaned to automatically release them into available guest inventory.
          </p>
        </div>

        <button
          onClick={() => setReportModalOpen(true)}
          className="btn btn-secondary btn-sm"
          style={{ color: '#DC2626' }}
        >
          <Wrench size={15} />
          <span>Report Maintenance Issue</span>
        </button>
      </div>

      {/* Task Status Filter Bar */}
      <div
        style={{
          display: 'flex',
          gap: '0.4rem',
          overflowX: 'auto',
          paddingBottom: '0.4rem',
          marginBottom: '2rem'
        }}
      >
        {[
          { id: 'all', label: `All Tasks (${tasks.length})` },
          { id: 'pending', label: 'Pending Start' },
          { id: 'in_progress', label: 'In Progress' },
          { id: 'completed', label: 'Completed Today' },
          { id: 'blocked', label: 'Blocked / DND' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setStatusFilter(filter.id as any)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-full)',
              fontSize: '0.82rem',
              fontWeight: statusFilter === filter.id ? 700 : 500,
              backgroundColor: statusFilter === filter.id ? 'var(--color-midnight)' : '#FFFFFF',
              color: statusFilter === filter.id ? '#FFFFFF' : 'var(--color-text-secondary)',
              border: '1px solid var(--color-border)',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Task Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {filteredTasks.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', backgroundColor: '#FFFFFF', padding: '3.5rem 2rem', borderRadius: 'var(--radius-xl)', textAlign: 'center', border: '1px solid var(--color-border)' }}>
            <Sparkles size={32} color="var(--color-sapphire)" style={{ margin: '0 auto 0.8rem' }} />
            <h3>No tasks in this category</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem' }}>
              All assigned rooms are up to date.
            </p>
          </div>
        ) : (
          filteredTasks.map(task => (
            <div
              key={task.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--color-border)',
                padding: '1.8rem',
                boxShadow: 'var(--shadow-sm)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-midnight)', fontFamily: 'var(--font-heading)' }}>
                      Room {task.roomNumber}
                    </span>
                    <span className="badge badge-sapphire" style={{ fontSize: '0.7rem' }}>
                      {task.roomType}
                    </span>
                  </div>
                  {getPriorityBadge(task.priority)}
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  {getStatusBadge(task.status)}
                  <span style={{ fontSize: '0.74rem', color: 'var(--color-text-muted)', marginLeft: '0.5rem' }}>
                    Assigned {new Date(task.assignedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div style={{ backgroundColor: 'var(--color-lace)', padding: '1rem', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--color-midnight-muted)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  <strong>Cleaning Checklist:</strong>
                  <p style={{ marginTop: '0.3rem', margin: 0 }}>{task.instructions}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '0.6rem', marginTop: 'auto' }}>
                {task.status === 'pending' && (
                  <button
                    onClick={() => updateTaskStatus(task.id, 'in_progress')}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <Play size={14} />
                    <span>Start Cleaning</span>
                  </button>
                )}

                {task.status === 'in_progress' && (
                  <button
                    onClick={() => updateTaskStatus(task.id, 'completed')}
                    className="btn btn-sm"
                    style={{ flex: 1, backgroundColor: '#059669', color: '#FFFFFF', borderRadius: 'var(--radius-full)' }}
                  >
                    <Check size={14} />
                    <span>Mark as Cleaned</span>
                  </button>
                )}

                {task.status === 'completed' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#059669', fontSize: '0.82rem', fontWeight: 700, padding: '0.4rem 0' }}>
                    <CheckCircle size={16} />
                    <span>Inspected & Available in Inventory</span>
                  </div>
                )}

                {task.status === 'blocked' && (
                  <button
                    onClick={() => updateTaskStatus(task.id, 'in_progress')}
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <span>Resume Turnover</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* REPORT ISSUE MODAL */}
      {reportModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(11, 25, 87, 0.6)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              maxWidth: '480px',
              width: '100%',
              boxShadow: 'var(--shadow-xl)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.2rem', paddingBottom: '0.8rem', borderBottom: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#DC2626' }}>
                <Wrench size={20} />
                <h3 style={{ fontSize: '1.25rem', color: 'var(--color-midnight)', margin: 0 }}>Report Room Maintenance</h3>
              </div>
              <button onClick={() => setReportModalOpen(false)} style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>✕</button>
            </div>

            {issueSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                <CheckCircle size={36} color="#059669" style={{ margin: '0 auto 0.8rem' }} />
                <h4>Maintenance Ticket Dispatched</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
                  Room {issueRoom} has been marked as maintenance and engineering staff notified.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit}>
                <div className="form-group">
                  <label className="form-label">Room Number</label>
                  <select
                    className="form-select"
                    value={issueRoom}
                    onChange={e => setIssueRoom(e.target.value)}
                  >
                    {rooms.map(r => (
                      <option key={r.id} value={r.roomNumber}>Room #{r.roomNumber} ({r.name})</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Issue Description</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    placeholder="E.g., Bathroom sink slow drainage, balcony door latch sticking..."
                    value={issueDescription}
                    onChange={e => setIssueDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Severity Level</label>
                  <select
                    className="form-select"
                    value={issuePriority}
                    onChange={e => setIssuePriority(e.target.value as any)}
                  >
                    <option value="urgent">Urgent (Requires immediate engineer)</option>
                    <option value="high">High (Address prior to next guest check-in)</option>
                    <option value="medium">Medium (Routine maintenance)</option>
                  </select>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.8rem', marginTop: '1.5rem' }}>
                  <button type="button" onClick={() => setReportModalOpen(false)} className="btn btn-secondary btn-sm">Cancel</button>
                  <button type="submit" className="btn btn-sm" style={{ backgroundColor: '#DC2626', color: '#FFFFFF', borderRadius: 'var(--radius-full)' }}>
                    Dispatch Ticket
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

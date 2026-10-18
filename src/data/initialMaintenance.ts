
import { MaintenanceReport } from '../types';

export const initialMaintenance: MaintenanceReport[] = [
  {
    id: 'mnt-01',
    roomNumber: '301',
    reportedBy: 'Housekeeping Staff',
    issue: 'Balcony dimmer switch calibration and terrace light flickering.',
    priority: 'medium',
    status: 'in_progress',
    createdAt: '2026-10-12T10:10:00Z',
    resolutionNotes: 'Facilities electrician inspecting circuit controller board.'
  },
  {
    id: 'mnt-02',
    roomNumber: '208',
    reportedBy: 'Front Desk / Guest',
    issue: 'Smart thermostat sensor reading 2 degrees deviation from target ambient temperature.',
    priority: 'low',
    status: 'pending',
    createdAt: '2026-10-12T11:45:00Z'
  },
  {
    id: 'mnt-03',
    roomNumber: '104',
    reportedBy: 'Housekeeping Staff',
    issue: 'Rainforest shower head mineral filtration cartridge renewal.',
    priority: 'high',
    status: 'resolved',
    createdAt: '2026-10-11T14:20:00Z',
    resolvedAt: '2026-10-11T16:00:00Z',
    resolutionNotes: 'Cartridge replaced with new eco-flow microfilter. Water pressure tested at optimal 4.2 bar.'
  }
];

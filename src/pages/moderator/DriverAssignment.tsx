
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { toast } from 'sonner';
import { useDriverTaskManagement, Task } from '@/hooks/useDriverTaskManagement';
import { DriversList } from '@/components/moderator/DriversList';
import { TasksTable } from '@/components/moderator/TasksTable';
import { AssignmentDialog } from '@/components/moderator/AssignmentDialog';
import { PriorityBadge } from '@/components/ui/status-badge';

const DriverAssignment = () => {
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string>('medium');
  const [notes, setNotes] = useState('');
  
  const { 
    drivers, 
    tasks, 
    loading,
    assignTaskToDriver 
  } = useDriverTaskManagement();

  const handleAssign = (task: Task) => {
    setSelectedTask(task);
    setShowAssignDialog(true);
    setSelectedDriverId(null);
    setSelectedPriority(task.priority || 'medium');
    setNotes(task.notes || '');
  };

  const handleAssignSubmit = async () => {
    if (!selectedTask || !selectedDriverId) {
      toast.error('Please select both a task and a driver');
      return;
    }

    const result = await assignTaskToDriver(
      selectedTask.id, 
      selectedDriverId,
      selectedPriority,
      notes
    );
    
    if (result.success) {
      setShowAssignDialog(false);
    }
  };

  const getPriorityBadge = (priority: string) => {
    return <PriorityBadge priority={priority} />;
  };

  return (
    <DashboardLayout title="Driver Assignment" dashboardType="moderator">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <DriversList 
            drivers={drivers}
            loading={loading.drivers}
          />
          <TasksTable 
            tasks={tasks}
            loading={loading.tasks}
            onAssign={handleAssign}
            getPriorityBadge={getPriorityBadge}
          />
        </div>

        <AssignmentDialog 
          open={showAssignDialog}
          onOpenChange={setShowAssignDialog}
          selectedTask={selectedTask}
          selectedDriverId={selectedDriverId}
          selectedPriority={selectedPriority}
          notes={notes}
          drivers={drivers}
          onDriverSelect={setSelectedDriverId}
          onPrioritySelect={setSelectedPriority}
          onNotesChange={setNotes}
          onSubmit={handleAssignSubmit}
        />
      </div>
    </DashboardLayout>
  );
};

export default DriverAssignment;

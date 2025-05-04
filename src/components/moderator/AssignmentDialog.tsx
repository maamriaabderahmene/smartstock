
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Task, Driver } from '@/hooks/useDriverTaskManagement';
import { Textarea } from '@/components/ui/textarea';

interface AssignmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTask: Task | null;
  selectedDriverId: string | null;
  selectedPriority: string;
  notes: string;
  drivers: Driver[];
  onDriverSelect: (driverId: string) => void;
  onPrioritySelect: (priority: string) => void;
  onNotesChange: (notes: string) => void;
  onSubmit: () => void;
}

export const AssignmentDialog = ({
  open,
  onOpenChange,
  selectedTask,
  selectedDriverId,
  selectedPriority,
  notes,
  drivers,
  onDriverSelect,
  onPrioritySelect,
  onNotesChange,
  onSubmit
}: AssignmentDialogProps) => {
  const availableDrivers = drivers.filter(driver => driver.available);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Task to Driver</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {selectedTask && (
            <div className="space-y-2">
              <Label>Task Information</Label>
              <div className="bg-muted/50 p-3 rounded-md">
                <p className="font-medium">{selectedTask.id}</p>
                <p className="text-sm text-muted-foreground">{selectedTask.tasktype} - {selectedTask.location}</p>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="driver">Select Driver</Label>
            <Select value={selectedDriverId || ""} onValueChange={onDriverSelect}>
              <SelectTrigger id="driver">
                <SelectValue placeholder="Select driver" />
              </SelectTrigger>
              <SelectContent>
                {availableDrivers.map((driver) => (
                  <SelectItem key={driver.id} value={driver.id}>
                    {driver.name} - {driver.currentTasks} tasks
                  </SelectItem>
                ))}
                {availableDrivers.length === 0 && (
                  <SelectItem value="none" disabled>No available drivers</SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Select value={selectedPriority} onValueChange={onPrioritySelect}>
              <SelectTrigger id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea 
              id="notes" 
              placeholder="Add any additional notes here..."
              value={notes}
              onChange={(e) => onNotesChange(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit}>
            Assign Task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

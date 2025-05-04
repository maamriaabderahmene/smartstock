
import { Package, Calendar, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Task } from '@/hooks/useDriverTaskManagement';
import { CustomCard } from '@/components/ui/custom-card';

interface TasksTableProps {
  tasks: Task[];
  loading: boolean;
  onAssign: (task: Task) => void;
  getPriorityBadge: (priority: string) => React.ReactNode;
}

export const TasksTable = ({ tasks, loading, onAssign, getPriorityBadge }: TasksTableProps) => {
  return (
    <CustomCard variant="elevated" className="lg:col-span-2">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-wms-accent" />
          Pending Tasks
        </h3>
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="h-8 w-8 animate-spin text-wms-accent" />
          </div>
        ) : tasks.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Task ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell className="font-medium">{task.id}</TableCell>
                  <TableCell>{task.tasktype}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-wms-accent" />
                      {task.location}
                    </div>
                  </TableCell>
                  <TableCell>{getPriorityBadge(task.priority)}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-wms-accent" />
                      {task.deadline}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button size="sm" variant="outline" onClick={() => onAssign(task)}>
                      Assign Driver
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col items-center justify-center p-8">
            <Package className="h-12 w-12 text-wms-500/50 mb-2" />
            <p className="text-lg font-medium text-wms-500">No pending tasks</p>
            <p className="text-sm text-wms-400">All tasks have been assigned or completed.</p>
          </div>
        )}
      </div>
    </CustomCard>
  );
};

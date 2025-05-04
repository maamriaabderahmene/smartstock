
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { CustomCard } from '@/components/ui/custom-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileCheck, FileSearch, FileX, Search, Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const AssignedInspections = () => {
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const activeInspection = location.state?.activeInspection;
  
  const [currentStep, setCurrentStep] = useState(activeInspection ? 1 : 0);
  const [zoneCode, setZoneCode] = useState('');
  const [inspectionResult, setInspectionResult] = useState('');
  const [notes, setNotes] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);

  const pendingInspections = [
    {
      id: 'ins-001',
      merchandise: 'Truck Tires',
      quantity: 20,
      operationType: 'Stocking',
      zone: 'B15',
      emplacement: 'E005',
      urgency: 'High',
      client: 'Michelin Tires',
      driver: 'John Smith'
    },
    {
      id: 'ins-002',
      merchandise: 'Car Batteries',
      quantity: 30,
      operationType: 'Destocking',
      zone: 'A07',
      emplacement: 'E022',
      urgency: 'Medium',
      client: 'AutoPower Inc',
      driver: 'David Johnson'
    },
    {
      id: 'ins-003',
      merchandise: 'Engine Oil',
      quantity: 50,
      operationType: 'Stocking',
      zone: 'C12',
      emplacement: 'E014',
      urgency: 'Low',
      client: 'Castrol Industries',
      driver: 'Michael Williams'
    }
  ];

  const [activeInspectionData, setActiveInspectionData] = useState(
    activeInspection || null
  );

  const handleStartInspection = (inspection) => {
    setActiveInspectionData(inspection);
    setCurrentStep(1);
  };

  const verifyZoneCode = () => {
    if (zoneCode === activeInspectionData.zone) {
      toast({
        title: "Zone Verified",
        description: "Zone code is correct. You can proceed with inspection."
      });
      setCurrentStep(2);
    } else {
      toast({
        title: "Incorrect Zone",
        description: "The entered zone code doesn't match. Please check again.",
        variant: "destructive"
      });
    }
  };

  const submitInspection = () => {
    toast({
      title: "Inspection Submitted",
      description: `Inspection for ${activeInspectionData.merchandise} has been submitted as ${inspectionResult}.`
    });
    setCurrentStep(3);
    
    // In a real application, would send this to an API
    console.log({
      inspectionId: activeInspectionData.id,
      result: inspectionResult,
      notes: notes,
      timestamp: new Date().toISOString()
    });
  };

  const finishAndReturn = () => {
    setCurrentStep(0);
    setActiveInspectionData(null);
    setZoneCode('');
    setInspectionResult('');
    setNotes('');
    navigate('/controller');
  };

  const renderInspectionList = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Assigned Inspections</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-wms-500" />
          <Input placeholder="Search inspections..." className="pl-9 w-[250px]" />
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="stocking">Stocking</TabsTrigger>
          <TabsTrigger value="destocking">Destocking</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {pendingInspections.map((inspection) => (
            <CustomCard variant="elevated" key={inspection.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      inspection.operationType === 'Stocking' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {inspection.operationType}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      inspection.urgency === 'High' ? 'bg-red-100 text-red-700' : 
                      inspection.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {inspection.urgency}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold">{inspection.merchandise}</h3>
                  
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-wms-600">
                    <div>
                      <span className="font-medium">Client:</span> {inspection.client}
                    </div>
                    <div>
                      <span className="font-medium">Driver:</span> {inspection.driver}
                    </div>
                    <div>
                      <span className="font-medium">Zone:</span> {inspection.zone} / {inspection.emplacement}
                    </div>
                    <div>
                      <span className="font-medium">Quantity:</span> {inspection.quantity} units
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-4">
                  <Button onClick={() => handleStartInspection(inspection)}>
                    Start Inspection
                  </Button>
                </div>
              </div>
            </CustomCard>
          ))}
        </TabsContent>
        
        <TabsContent value="stocking" className="space-y-4">
          {pendingInspections.filter(i => i.operationType === 'Stocking').map((inspection) => (
            // Same card structure as above
            <CustomCard variant="elevated" key={inspection.id} className="overflow-hidden">
              {/* ... inspection card content similar to above ... */}
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {inspection.operationType}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      inspection.urgency === 'High' ? 'bg-red-100 text-red-700' : 
                      inspection.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {inspection.urgency}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold">{inspection.merchandise}</h3>
                  
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-wms-600">
                    <div>
                      <span className="font-medium">Client:</span> {inspection.client}
                    </div>
                    <div>
                      <span className="font-medium">Driver:</span> {inspection.driver}
                    </div>
                    <div>
                      <span className="font-medium">Zone:</span> {inspection.zone} / {inspection.emplacement}
                    </div>
                    <div>
                      <span className="font-medium">Quantity:</span> {inspection.quantity} units
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-4">
                  <Button onClick={() => handleStartInspection(inspection)}>
                    Start Inspection
                  </Button>
                </div>
              </div>
            </CustomCard>
          ))}
        </TabsContent>
        
        <TabsContent value="destocking" className="space-y-4">
          {pendingInspections.filter(i => i.operationType === 'Destocking').map((inspection) => (
            // Same card structure as above
            <CustomCard variant="elevated" key={inspection.id} className="overflow-hidden">
              {/* ... inspection card content similar to above ... */}
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                      {inspection.operationType}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      inspection.urgency === 'High' ? 'bg-red-100 text-red-700' : 
                      inspection.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {inspection.urgency}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold">{inspection.merchandise}</h3>
                  
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-wms-600">
                    <div>
                      <span className="font-medium">Client:</span> {inspection.client}
                    </div>
                    <div>
                      <span className="font-medium">Driver:</span> {inspection.driver}
                    </div>
                    <div>
                      <span className="font-medium">Zone:</span> {inspection.zone} / {inspection.emplacement}
                    </div>
                    <div>
                      <span className="font-medium">Quantity:</span> {inspection.quantity} units
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-4">
                  <Button onClick={() => handleStartInspection(inspection)}>
                    Start Inspection
                  </Button>
                </div>
              </div>
            </CustomCard>
          ))}
        </TabsContent>
        
        <TabsContent value="urgent" className="space-y-4">
          {pendingInspections.filter(i => i.urgency === 'High').map((inspection) => (
            // Same card structure as above
            <CustomCard variant="elevated" key={inspection.id} className="overflow-hidden">
              {/* ... inspection card content similar to above ... */}
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6">
                <div className="flex-1">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      inspection.operationType === 'Stocking' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {inspection.operationType}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      {inspection.urgency}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold">{inspection.merchandise}</h3>
                  
                  <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-wms-600">
                    <div>
                      <span className="font-medium">Client:</span> {inspection.client}
                    </div>
                    <div>
                      <span className="font-medium">Driver:</span> {inspection.driver}
                    </div>
                    <div>
                      <span className="font-medium">Zone:</span> {inspection.zone} / {inspection.emplacement}
                    </div>
                    <div>
                      <span className="font-medium">Quantity:</span> {inspection.quantity} units
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 md:mt-0 md:ml-4">
                  <Button onClick={() => handleStartInspection(inspection)}>
                    Start Inspection
                  </Button>
                </div>
              </div>
            </CustomCard>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );

  const renderZoneConfirmation = () => (
    <CustomCard variant="elevated" className="max-w-xl mx-auto">
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Zone Confirmation</h2>
          <p className="text-wms-600 mt-2">
            Please scan or enter the zone code to confirm you are at the correct location
          </p>
        </div>

        <div className="p-4 bg-wms-50 rounded-lg">
          <h3 className="font-semibold">Inspection Details:</h3>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">Merchandise:</span> {activeInspectionData.merchandise}</div>
            <div><span className="font-medium">Quantity:</span> {activeInspectionData.quantity}</div>
            <div><span className="font-medium">Zone:</span> {activeInspectionData.zone}</div>
            <div><span className="font-medium">Spot:</span> {activeInspectionData.emplacement}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="zoneCode" className="block font-medium">
              Enter Zone Code
            </label>
            <div className="flex items-center space-x-2">
              <Input
                id="zoneCode"
                placeholder="e.g., B15"
                value={zoneCode}
                onChange={(e) => setZoneCode(e.target.value)}
                className="text-lg font-mono"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={verifyZoneCode}
            disabled={!zoneCode}
          >
            Verify Zone
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => {
              setCurrentStep(0);
              setActiveInspectionData(null);
            }}
          >
            Cancel Inspection
          </Button>
        </div>
      </div>
    </CustomCard>
  );

  const renderMerchandiseVerification = () => (
    <CustomCard variant="elevated" className="max-w-2xl mx-auto">
      <div className="p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Merchandise Verification</h2>
          <p className="text-wms-600 mt-2">
            Please verify the merchandise details and condition
          </p>
        </div>

        <div className="p-4 bg-wms-50 rounded-lg">
          <h3 className="font-semibold">Inspection Details:</h3>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">Merchandise:</span> {activeInspectionData.merchandise}</div>
            <div><span className="font-medium">Quantity:</span> {activeInspectionData.quantity}</div>
            <div><span className="font-medium">Zone:</span> {activeInspectionData.zone}</div>
            <div><span className="font-medium">Spot:</span> {activeInspectionData.emplacement}</div>
            <div><span className="font-medium">Operation:</span> {activeInspectionData.operationType}</div>
            <div><span className="font-medium">Client:</span> {activeInspectionData.client || 'Unknown'}</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-semibold mb-3">Inspection Result</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant={inspectionResult === 'Accepted' ? 'default' : 'outline'} 
                className="flex-1 justify-start"
                onClick={() => setInspectionResult('Accepted')}
              >
                <FileCheck className="mr-2 h-5 w-5 text-green-500" />
                Accepted
              </Button>
              <Button 
                variant={inspectionResult === 'Minor Issues' ? 'default' : 'outline'} 
                className="flex-1 justify-start"
                onClick={() => setInspectionResult('Minor Issues')}
              >
                <FileSearch className="mr-2 h-5 w-5 text-yellow-500" />
                Minor Issues
              </Button>
              <Button 
                variant={inspectionResult === 'Rejected' ? 'default' : 'outline'} 
                className="flex-1 justify-start"
                onClick={() => setInspectionResult('Rejected')}
              >
                <FileX className="mr-2 h-5 w-5 text-red-500" />
                Rejected
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="block font-medium">
              Notes / Comments
            </label>
            <Textarea 
              id="notes"
              placeholder="Enter any observations or issues..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>

          <div>
            <Button 
              variant="outline" 
              type="button"
              className="flex items-center"
              onClick={() => setShowImageUpload(!showImageUpload)}
            >
              <Camera className="mr-2 h-4 w-4" />
              {showImageUpload ? 'Hide Photo Upload' : 'Add Photos'}
            </Button>
            
            {showImageUpload && (
              <div className="mt-3 border-2 border-dashed border-wms-200 rounded-lg p-6 text-center">
                <Camera className="h-8 w-8 mx-auto text-wms-400" />
                <p className="mt-2 text-sm text-wms-600">
                  Drag and drop photos here, or click to select files
                </p>
                <p className="mt-1 text-xs text-wms-500">
                  JPG, PNG or GIF up to 10MB
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Upload Photo
                </Button>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={() => setCurrentStep(1)}
            >
              Go Back
            </Button>
            <Button 
              className="flex-1" 
              onClick={submitInspection}
              disabled={!inspectionResult}
            >
              Submit Inspection
            </Button>
          </div>
        </div>
      </div>
    </CustomCard>
  );

  const renderCompletionScreen = () => (
    <CustomCard variant="elevated" className="max-w-lg mx-auto">
      <div className="p-6 text-center space-y-6">
        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center ${
          inspectionResult === 'Accepted' ? 'bg-green-100' : 
          inspectionResult === 'Minor Issues' ? 'bg-yellow-100' :
          'bg-red-100'
        }`}>
          {inspectionResult === 'Accepted' ? (
            <FileCheck className="h-8 w-8 text-green-600" />
          ) : inspectionResult === 'Minor Issues' ? (
            <FileSearch className="h-8 w-8 text-yellow-600" />
          ) : (
            <FileX className="h-8 w-8 text-red-600" />
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold">Inspection Submitted</h2>
          <p className="text-wms-600 mt-2">
            The inspection for {activeInspectionData.merchandise} has been submitted successfully.
          </p>
        </div>
        
        <div className="p-4 bg-wms-50 rounded-lg text-left">
          <h3 className="font-semibold">Summary:</h3>
          <div className="mt-2 space-y-1 text-sm">
            <div><span className="font-medium">Merchandise:</span> {activeInspectionData.merchandise}</div>
            <div><span className="font-medium">Result:</span> {inspectionResult}</div>
            <div><span className="font-medium">Zone:</span> {activeInspectionData.zone} / {activeInspectionData.emplacement}</div>
            <div><span className="font-medium">Time:</span> {new Date().toLocaleTimeString()}</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <Button className="w-full" onClick={finishAndReturn}>
            Return to Dashboard
          </Button>
          <Button variant="outline" className="w-full" onClick={() => setCurrentStep(0)}>
            View All Inspections
          </Button>
        </div>
      </div>
    </CustomCard>
  );

  return (
    <DashboardLayout title="Assigned Inspections" dashboardType="controller">
      {currentStep === 0 && renderInspectionList()}
      {currentStep === 1 && renderZoneConfirmation()}
      {currentStep === 2 && renderMerchandiseVerification()}
      {currentStep === 3 && renderCompletionScreen()}
    </DashboardLayout>
  );
};

export default AssignedInspections;

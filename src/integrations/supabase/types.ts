export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accesslevels: {
        Row: {
          accesslevelid: number
          accesstype: Database["public"]["Enums"]["permissiontypeenum"]
          createdat: string | null
          createdby: number | null
          isactive: boolean | null
          notes: string | null
          resourcetype: Database["public"]["Enums"]["resourcetypeenum"]
          updatedat: string | null
          updatedby: number | null
          userrole: Database["public"]["Enums"]["userroleenum"]
        }
        Insert: {
          accesslevelid?: number
          accesstype: Database["public"]["Enums"]["permissiontypeenum"]
          createdat?: string | null
          createdby?: number | null
          isactive?: boolean | null
          notes?: string | null
          resourcetype: Database["public"]["Enums"]["resourcetypeenum"]
          updatedat?: string | null
          updatedby?: number | null
          userrole: Database["public"]["Enums"]["userroleenum"]
        }
        Update: {
          accesslevelid?: number
          accesstype?: Database["public"]["Enums"]["permissiontypeenum"]
          createdat?: string | null
          createdby?: number | null
          isactive?: boolean | null
          notes?: string | null
          resourcetype?: Database["public"]["Enums"]["resourcetypeenum"]
          updatedat?: string | null
          updatedby?: number | null
          userrole?: Database["public"]["Enums"]["userroleenum"]
        }
        Relationships: []
      }
      administrators: {
        Row: {
          administratorid: number
          administratorname: string
          contactinfo: string | null
          createdat: string | null
          email: string
          isactive: boolean | null
          lastlogin: string | null
          notes: string | null
          passwordhash: string
          role: Database["public"]["Enums"]["administratorroleenum"]
          updatedat: string | null
        }
        Insert: {
          administratorid?: number
          administratorname: string
          contactinfo?: string | null
          createdat?: string | null
          email: string
          isactive?: boolean | null
          lastlogin?: string | null
          notes?: string | null
          passwordhash: string
          role: Database["public"]["Enums"]["administratorroleenum"]
          updatedat?: string | null
        }
        Update: {
          administratorid?: number
          administratorname?: string
          contactinfo?: string | null
          createdat?: string | null
          email?: string
          isactive?: boolean | null
          lastlogin?: string | null
          notes?: string | null
          passwordhash?: string
          role?: Database["public"]["Enums"]["administratorroleenum"]
          updatedat?: string | null
        }
        Relationships: []
      }
      buyerinformation: {
        Row: {
          address: string | null
          buyerid: number
          buyername: string
          contactinfo: string | null
          createdat: string | null
          email: string | null
        }
        Insert: {
          address?: string | null
          buyerid?: number
          buyername: string
          contactinfo?: string | null
          createdat?: string | null
          email?: string | null
        }
        Update: {
          address?: string | null
          buyerid?: number
          buyername?: string
          contactinfo?: string | null
          createdat?: string | null
          email?: string | null
        }
        Relationships: []
      }
      clarkcodes: {
        Row: {
          clarkcode: string
          clarkcodeid: number
          createdat: string | null
          driverid: number | null
          merchandiseid: number | null
          notes: string | null
          status: Database["public"]["Enums"]["statusenum"] | null
          taskid: number | null
          zoneid: number | null
        }
        Insert: {
          clarkcode: string
          clarkcodeid?: number
          createdat?: string | null
          driverid?: number | null
          merchandiseid?: number | null
          notes?: string | null
          status?: Database["public"]["Enums"]["statusenum"] | null
          taskid?: number | null
          zoneid?: number | null
        }
        Update: {
          clarkcode?: string
          clarkcodeid?: number
          createdat?: string | null
          driverid?: number | null
          merchandiseid?: number | null
          notes?: string | null
          status?: Database["public"]["Enums"]["statusenum"] | null
          taskid?: number | null
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "clarkcodes_driverid_fkey"
            columns: ["driverid"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["driverid"]
          },
          {
            foreignKeyName: "clarkcodes_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "clarkcodes_taskid_fkey"
            columns: ["taskid"]
            isOneToOne: false
            referencedRelation: "drivertasks"
            referencedColumns: ["taskid"]
          },
          {
            foreignKeyName: "clarkcodes_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
      clientorders: {
        Row: {
          buyerinfo: string | null
          clientid: number | null
          destinationaddress: string | null
          limitdate: string | null
          notes: string | null
          orderdate: string | null
          orderid: number
          ordertype: Database["public"]["Enums"]["ordertypeenum"]
          status: Database["public"]["Enums"]["statusenum"] | null
        }
        Insert: {
          buyerinfo?: string | null
          clientid?: number | null
          destinationaddress?: string | null
          limitdate?: string | null
          notes?: string | null
          orderdate?: string | null
          orderid?: number
          ordertype: Database["public"]["Enums"]["ordertypeenum"]
          status?: Database["public"]["Enums"]["statusenum"] | null
        }
        Update: {
          buyerinfo?: string | null
          clientid?: number | null
          destinationaddress?: string | null
          limitdate?: string | null
          notes?: string | null
          orderdate?: string | null
          orderid?: number
          ordertype?: Database["public"]["Enums"]["ordertypeenum"]
          status?: Database["public"]["Enums"]["statusenum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "clientorders_clientid_fkey"
            columns: ["clientid"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["clientid"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          clientid: number
          clientname: string
          clienttype: Database["public"]["Enums"]["clienttypeenum"]
          contactinfo: string | null
          createdat: string | null
          email: string | null
        }
        Insert: {
          address?: string | null
          clientid?: number
          clientname: string
          clienttype: Database["public"]["Enums"]["clienttypeenum"]
          contactinfo?: string | null
          createdat?: string | null
          email?: string | null
        }
        Update: {
          address?: string | null
          clientid?: number
          clientname?: string
          clienttype?: Database["public"]["Enums"]["clienttypeenum"]
          contactinfo?: string | null
          createdat?: string | null
          email?: string | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          address: string | null
          city: string | null
          company_id: number
          company_name: string
          contact_email: string | null
          contact_person: string | null
          contact_phone: string | null
          country: string | null
          created_at: string | null
          email: string
          employee_count: number | null
          established_date: string | null
          industry: string | null
          legal_structure: string | null
          phone_number: string | null
          postal_code: string | null
          registration_no: string
          revenue: number | null
          status: string | null
          tax_id: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          company_id?: number
          company_name: string
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string | null
          email: string
          employee_count?: number | null
          established_date?: string | null
          industry?: string | null
          legal_structure?: string | null
          phone_number?: string | null
          postal_code?: string | null
          registration_no: string
          revenue?: number | null
          status?: string | null
          tax_id: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          company_id?: number
          company_name?: string
          contact_email?: string | null
          contact_person?: string | null
          contact_phone?: string | null
          country?: string | null
          created_at?: string | null
          email?: string
          employee_count?: number | null
          established_date?: string | null
          industry?: string | null
          legal_structure?: string | null
          phone_number?: string | null
          postal_code?: string | null
          registration_no?: string
          revenue?: number | null
          status?: string | null
          tax_id?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      controllerperformancelogs: {
        Row: {
          controllerid: number | null
          logdate: string | null
          logid: number
          merchandiseid: number | null
          metrictype: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue: number | null
          notes: string | null
          tasktype: Database["public"]["Enums"]["ordertypeenum"] | null
          zoneid: number | null
        }
        Insert: {
          controllerid?: number | null
          logdate?: string | null
          logid?: number
          merchandiseid?: number | null
          metrictype: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue?: number | null
          notes?: string | null
          tasktype?: Database["public"]["Enums"]["ordertypeenum"] | null
          zoneid?: number | null
        }
        Update: {
          controllerid?: number | null
          logdate?: string | null
          logid?: number
          merchandiseid?: number | null
          metrictype?: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue?: number | null
          notes?: string | null
          tasktype?: Database["public"]["Enums"]["ordertypeenum"] | null
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "controllerperformancelogs_controllerid_fkey"
            columns: ["controllerid"]
            isOneToOne: false
            referencedRelation: "controllers"
            referencedColumns: ["controllerid"]
          },
          {
            foreignKeyName: "controllerperformancelogs_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "controllerperformancelogs_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
      controllers: {
        Row: {
          availability: Database["public"]["Enums"]["availabilityenum"] | null
          contactinfo: string | null
          controllerid: number
          controllername: string
          createdat: string | null
          email: string | null
          notes: string | null
        }
        Insert: {
          availability?: Database["public"]["Enums"]["availabilityenum"] | null
          contactinfo?: string | null
          controllerid?: number
          controllername: string
          createdat?: string | null
          email?: string | null
          notes?: string | null
        }
        Update: {
          availability?: Database["public"]["Enums"]["availabilityenum"] | null
          contactinfo?: string | null
          controllerid?: number
          controllername?: string
          createdat?: string | null
          email?: string | null
          notes?: string | null
        }
        Relationships: []
      }
      destinationaddresses: {
        Row: {
          addressid: number
          addressline1: string
          addressline2: string | null
          city: string
          country: string
          createdat: string | null
          latitude: number | null
          longitude: number | null
          notes: string | null
          postalcode: string | null
          state: string | null
          updatedat: string | null
        }
        Insert: {
          addressid?: number
          addressline1: string
          addressline2?: string | null
          city: string
          country: string
          createdat?: string | null
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          postalcode?: string | null
          state?: string | null
          updatedat?: string | null
        }
        Update: {
          addressid?: number
          addressline1?: string
          addressline2?: string | null
          city?: string
          country?: string
          createdat?: string | null
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          postalcode?: string | null
          state?: string | null
          updatedat?: string | null
        }
        Relationships: []
      }
      destockingorders: {
        Row: {
          assignedcontrollerid: number | null
          assigneddriverid: number | null
          buyerinfoid: number | null
          destinationaddressid: number | null
          destockingdate: string | null
          destockingorderid: number
          merchandiseid: number | null
          notes: string | null
          orderid: number | null
          quantity: number | null
          status: Database["public"]["Enums"]["statusenum"] | null
        }
        Insert: {
          assignedcontrollerid?: number | null
          assigneddriverid?: number | null
          buyerinfoid?: number | null
          destinationaddressid?: number | null
          destockingdate?: string | null
          destockingorderid?: number
          merchandiseid?: number | null
          notes?: string | null
          orderid?: number | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["statusenum"] | null
        }
        Update: {
          assignedcontrollerid?: number | null
          assigneddriverid?: number | null
          buyerinfoid?: number | null
          destinationaddressid?: number | null
          destockingdate?: string | null
          destockingorderid?: number
          merchandiseid?: number | null
          notes?: string | null
          orderid?: number | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["statusenum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "destockingorders_assignedcontrollerid_fkey"
            columns: ["assignedcontrollerid"]
            isOneToOne: false
            referencedRelation: "controllers"
            referencedColumns: ["controllerid"]
          },
          {
            foreignKeyName: "destockingorders_assigneddriverid_fkey"
            columns: ["assigneddriverid"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["driverid"]
          },
          {
            foreignKeyName: "destockingorders_buyerinfoid_fkey"
            columns: ["buyerinfoid"]
            isOneToOne: false
            referencedRelation: "buyerinformation"
            referencedColumns: ["buyerid"]
          },
          {
            foreignKeyName: "destockingorders_destinationaddressid_fkey"
            columns: ["destinationaddressid"]
            isOneToOne: false
            referencedRelation: "destinationaddresses"
            referencedColumns: ["addressid"]
          },
          {
            foreignKeyName: "destockingorders_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "destockingorders_orderid_fkey"
            columns: ["orderid"]
            isOneToOne: false
            referencedRelation: "clientorders"
            referencedColumns: ["orderid"]
          },
        ]
      }
      driverperformancelogs: {
        Row: {
          driverid: number | null
          logdate: string | null
          logid: number
          merchandiseid: number | null
          metrictype: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue: number | null
          notes: string | null
          tasktype: Database["public"]["Enums"]["ordertypeenum"] | null
          zoneid: number | null
        }
        Insert: {
          driverid?: number | null
          logdate?: string | null
          logid?: number
          merchandiseid?: number | null
          metrictype: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue?: number | null
          notes?: string | null
          tasktype?: Database["public"]["Enums"]["ordertypeenum"] | null
          zoneid?: number | null
        }
        Update: {
          driverid?: number | null
          logdate?: string | null
          logid?: number
          merchandiseid?: number | null
          metrictype?: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue?: number | null
          notes?: string | null
          tasktype?: Database["public"]["Enums"]["ordertypeenum"] | null
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "driverperformancelogs_driverid_fkey"
            columns: ["driverid"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["driverid"]
          },
          {
            foreignKeyName: "driverperformancelogs_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "driverperformancelogs_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
      drivers: {
        Row: {
          availability: Database["public"]["Enums"]["availabilityenum"] | null
          contactinfo: string | null
          createdat: string | null
          driverid: number
          drivername: string
          email: string | null
          licensenumber: string | null
          notes: string | null
          vehicleinfo: string | null
        }
        Insert: {
          availability?: Database["public"]["Enums"]["availabilityenum"] | null
          contactinfo?: string | null
          createdat?: string | null
          driverid?: number
          drivername: string
          email?: string | null
          licensenumber?: string | null
          notes?: string | null
          vehicleinfo?: string | null
        }
        Update: {
          availability?: Database["public"]["Enums"]["availabilityenum"] | null
          contactinfo?: string | null
          createdat?: string | null
          driverid?: number
          drivername?: string
          email?: string | null
          licensenumber?: string | null
          notes?: string | null
          vehicleinfo?: string | null
        }
        Relationships: []
      }
      drivertasks: {
        Row: {
          driverid: number | null
          endtime: string | null
          merchandiseid: number | null
          notes: string | null
          orderid: number | null
          starttime: string | null
          taskid: number
          taskstatus: Database["public"]["Enums"]["taskstatusenum"] | null
          tasktype: Database["public"]["Enums"]["ordertypeenum"]
          zoneid: number | null
        }
        Insert: {
          driverid?: number | null
          endtime?: string | null
          merchandiseid?: number | null
          notes?: string | null
          orderid?: number | null
          starttime?: string | null
          taskid?: number
          taskstatus?: Database["public"]["Enums"]["taskstatusenum"] | null
          tasktype: Database["public"]["Enums"]["ordertypeenum"]
          zoneid?: number | null
        }
        Update: {
          driverid?: number | null
          endtime?: string | null
          merchandiseid?: number | null
          notes?: string | null
          orderid?: number | null
          starttime?: string | null
          taskid?: number
          taskstatus?: Database["public"]["Enums"]["taskstatusenum"] | null
          tasktype?: Database["public"]["Enums"]["ordertypeenum"]
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "drivertasks_driverid_fkey"
            columns: ["driverid"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["driverid"]
          },
          {
            foreignKeyName: "drivertasks_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "drivertasks_orderid_fkey"
            columns: ["orderid"]
            isOneToOne: false
            referencedRelation: "clientorders"
            referencedColumns: ["orderid"]
          },
          {
            foreignKeyName: "drivertasks_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
      feedback: {
        Row: {
          feedbackdate: string | null
          feedbackid: number
          feedbacktext: string
          feedbacktype: Database["public"]["Enums"]["feedbacktypeenum"] | null
          notes: string | null
          status: Database["public"]["Enums"]["feedbackstatusenum"] | null
          userid: number
          userrole: Database["public"]["Enums"]["userroleenum"]
        }
        Insert: {
          feedbackdate?: string | null
          feedbackid?: number
          feedbacktext: string
          feedbacktype?: Database["public"]["Enums"]["feedbacktypeenum"] | null
          notes?: string | null
          status?: Database["public"]["Enums"]["feedbackstatusenum"] | null
          userid: number
          userrole: Database["public"]["Enums"]["userroleenum"]
        }
        Update: {
          feedbackdate?: string | null
          feedbackid?: number
          feedbacktext?: string
          feedbacktype?: Database["public"]["Enums"]["feedbacktypeenum"] | null
          notes?: string | null
          status?: Database["public"]["Enums"]["feedbackstatusenum"] | null
          userid?: number
          userrole?: Database["public"]["Enums"]["userroleenum"]
        }
        Relationships: [
          {
            foreignKeyName: "feedback_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "moderators"
            referencedColumns: ["moderatorid"]
          },
          {
            foreignKeyName: "feedback_userid_fkey1"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["driverid"]
          },
          {
            foreignKeyName: "feedback_userid_fkey2"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "controllers"
            referencedColumns: ["controllerid"]
          },
        ]
      }
      historicaldata: {
        Row: {
          datadetails: string
          dataid: number | null
          datatype: Database["public"]["Enums"]["reporttypeenum"]
          historicalid: number
          merchandiseid: number | null
          notes: string | null
          recordedat: string | null
          userid: number | null
          userrole: Database["public"]["Enums"]["userroleenum"] | null
          zoneid: number | null
        }
        Insert: {
          datadetails: string
          dataid?: number | null
          datatype: Database["public"]["Enums"]["reporttypeenum"]
          historicalid?: number
          merchandiseid?: number | null
          notes?: string | null
          recordedat?: string | null
          userid?: number | null
          userrole?: Database["public"]["Enums"]["userroleenum"] | null
          zoneid?: number | null
        }
        Update: {
          datadetails?: string
          dataid?: number | null
          datatype?: Database["public"]["Enums"]["reporttypeenum"]
          historicalid?: number
          merchandiseid?: number | null
          notes?: string | null
          recordedat?: string | null
          userid?: number | null
          userrole?: Database["public"]["Enums"]["userroleenum"] | null
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "historicaldata_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "historicaldata_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "moderators"
            referencedColumns: ["moderatorid"]
          },
          {
            foreignKeyName: "historicaldata_userid_fkey1"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["driverid"]
          },
          {
            foreignKeyName: "historicaldata_userid_fkey2"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "controllers"
            referencedColumns: ["controllerid"]
          },
          {
            foreignKeyName: "historicaldata_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
      inspections: {
        Row: {
          controllerid: number | null
          inspectiondate: string | null
          inspectionid: number
          inspectionstatus: Database["public"]["Enums"]["inspectionstatusenum"]
          merchandiseid: number | null
          notes: string | null
          taskid: number | null
          zoneid: number | null
        }
        Insert: {
          controllerid?: number | null
          inspectiondate?: string | null
          inspectionid?: number
          inspectionstatus: Database["public"]["Enums"]["inspectionstatusenum"]
          merchandiseid?: number | null
          notes?: string | null
          taskid?: number | null
          zoneid?: number | null
        }
        Update: {
          controllerid?: number | null
          inspectiondate?: string | null
          inspectionid?: number
          inspectionstatus?: Database["public"]["Enums"]["inspectionstatusenum"]
          merchandiseid?: number | null
          notes?: string | null
          taskid?: number | null
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "inspections_controllerid_fkey"
            columns: ["controllerid"]
            isOneToOne: false
            referencedRelation: "controllers"
            referencedColumns: ["controllerid"]
          },
          {
            foreignKeyName: "inspections_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "inspections_taskid_fkey"
            columns: ["taskid"]
            isOneToOne: false
            referencedRelation: "drivertasks"
            referencedColumns: ["taskid"]
          },
          {
            foreignKeyName: "inspections_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
      merchandise: {
        Row: {
          categoryid: number | null
          createdat: string | null
          dimensions: string | null
          merchandiseid: number
          merchandisename: string
          quantity: number
          storagehumidity: number | null
          storagetemperature: number | null
          weight: number
        }
        Insert: {
          categoryid?: number | null
          createdat?: string | null
          dimensions?: string | null
          merchandiseid?: number
          merchandisename: string
          quantity: number
          storagehumidity?: number | null
          storagetemperature?: number | null
          weight: number
        }
        Update: {
          categoryid?: number | null
          createdat?: string | null
          dimensions?: string | null
          merchandiseid?: number
          merchandisename?: string
          quantity?: number
          storagehumidity?: number | null
          storagetemperature?: number | null
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "merchandise_categoryid_fkey"
            columns: ["categoryid"]
            isOneToOne: false
            referencedRelation: "merchandisecategories"
            referencedColumns: ["categoryid"]
          },
        ]
      }
      merchandisecategories: {
        Row: {
          categoryid: number
          categoryname: string
          createdat: string | null
        }
        Insert: {
          categoryid?: number
          categoryname: string
          createdat?: string | null
        }
        Update: {
          categoryid?: number
          categoryname?: string
          createdat?: string | null
        }
        Relationships: []
      }
      merchandisedetails: {
        Row: {
          createdat: string | null
          detailid: number
          detailname: string
          detailtype: Database["public"]["Enums"]["detailtypeenum"] | null
          detailvalue: string
          merchandiseid: number | null
          notes: string | null
          updatedat: string | null
        }
        Insert: {
          createdat?: string | null
          detailid?: number
          detailname: string
          detailtype?: Database["public"]["Enums"]["detailtypeenum"] | null
          detailvalue: string
          merchandiseid?: number | null
          notes?: string | null
          updatedat?: string | null
        }
        Update: {
          createdat?: string | null
          detailid?: number
          detailname?: string
          detailtype?: Database["public"]["Enums"]["detailtypeenum"] | null
          detailvalue?: string
          merchandiseid?: number | null
          notes?: string | null
          updatedat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "merchandisedetails_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
        ]
      }
      merchandiseinspectionlogs: {
        Row: {
          controllerid: number | null
          inspectionid: number | null
          logdate: string | null
          logdetails: string
          logid: number
          logstatus: Database["public"]["Enums"]["inspectionstatusenum"] | null
          merchandiseid: number | null
          notes: string | null
          taskid: number | null
          zoneid: number | null
        }
        Insert: {
          controllerid?: number | null
          inspectionid?: number | null
          logdate?: string | null
          logdetails: string
          logid?: number
          logstatus?: Database["public"]["Enums"]["inspectionstatusenum"] | null
          merchandiseid?: number | null
          notes?: string | null
          taskid?: number | null
          zoneid?: number | null
        }
        Update: {
          controllerid?: number | null
          inspectionid?: number | null
          logdate?: string | null
          logdetails?: string
          logid?: number
          logstatus?: Database["public"]["Enums"]["inspectionstatusenum"] | null
          merchandiseid?: number | null
          notes?: string | null
          taskid?: number | null
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "merchandiseinspectionlogs_controllerid_fkey"
            columns: ["controllerid"]
            isOneToOne: false
            referencedRelation: "controllers"
            referencedColumns: ["controllerid"]
          },
          {
            foreignKeyName: "merchandiseinspectionlogs_inspectionid_fkey"
            columns: ["inspectionid"]
            isOneToOne: false
            referencedRelation: "inspections"
            referencedColumns: ["inspectionid"]
          },
          {
            foreignKeyName: "merchandiseinspectionlogs_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "merchandiseinspectionlogs_taskid_fkey"
            columns: ["taskid"]
            isOneToOne: false
            referencedRelation: "drivertasks"
            referencedColumns: ["taskid"]
          },
          {
            foreignKeyName: "merchandiseinspectionlogs_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
      moderatorperformancelogs: {
        Row: {
          logdate: string | null
          logid: number
          merchandiseid: number | null
          metrictype: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue: number | null
          moderatorid: number | null
          notes: string | null
          tasktype: Database["public"]["Enums"]["ordertypeenum"] | null
          zoneid: number | null
        }
        Insert: {
          logdate?: string | null
          logid?: number
          merchandiseid?: number | null
          metrictype: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue?: number | null
          moderatorid?: number | null
          notes?: string | null
          tasktype?: Database["public"]["Enums"]["ordertypeenum"] | null
          zoneid?: number | null
        }
        Update: {
          logdate?: string | null
          logid?: number
          merchandiseid?: number | null
          metrictype?: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue?: number | null
          moderatorid?: number | null
          notes?: string | null
          tasktype?: Database["public"]["Enums"]["ordertypeenum"] | null
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "moderatorperformancelogs_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "moderatorperformancelogs_moderatorid_fkey"
            columns: ["moderatorid"]
            isOneToOne: false
            referencedRelation: "moderators"
            referencedColumns: ["moderatorid"]
          },
          {
            foreignKeyName: "moderatorperformancelogs_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
      moderators: {
        Row: {
          availability: Database["public"]["Enums"]["availabilityenum"] | null
          contactinfo: string | null
          createdat: string | null
          dateofbirth: string | null
          email: string | null
          moderatorid: number
          moderatorname: string
          notes: string | null
          recruitmentdate: string | null
          role: Database["public"]["Enums"]["userroleenum"] | null
        }
        Insert: {
          availability?: Database["public"]["Enums"]["availabilityenum"] | null
          contactinfo?: string | null
          createdat?: string | null
          dateofbirth?: string | null
          email?: string | null
          moderatorid?: number
          moderatorname: string
          notes?: string | null
          recruitmentdate?: string | null
          role?: Database["public"]["Enums"]["userroleenum"] | null
        }
        Update: {
          availability?: Database["public"]["Enums"]["availabilityenum"] | null
          contactinfo?: string | null
          createdat?: string | null
          dateofbirth?: string | null
          email?: string | null
          moderatorid?: number
          moderatorname?: string
          notes?: string | null
          recruitmentdate?: string | null
          role?: Database["public"]["Enums"]["userroleenum"] | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          isread: boolean | null
          notes: string | null
          notificationdate: string | null
          notificationid: number
          notificationtype: Database["public"]["Enums"]["notificationtypeenum"]
          userid: number
          userrole: Database["public"]["Enums"]["userroleenum"]
        }
        Insert: {
          isread?: boolean | null
          notes?: string | null
          notificationdate?: string | null
          notificationid?: number
          notificationtype: Database["public"]["Enums"]["notificationtypeenum"]
          userid: number
          userrole: Database["public"]["Enums"]["userroleenum"]
        }
        Update: {
          isread?: boolean | null
          notes?: string | null
          notificationdate?: string | null
          notificationid?: number
          notificationtype?: Database["public"]["Enums"]["notificationtypeenum"]
          userid?: number
          userrole?: Database["public"]["Enums"]["userroleenum"]
        }
        Relationships: [
          {
            foreignKeyName: "notifications_userid_fkey"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "moderators"
            referencedColumns: ["moderatorid"]
          },
          {
            foreignKeyName: "notifications_userid_fkey1"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["driverid"]
          },
          {
            foreignKeyName: "notifications_userid_fkey2"
            columns: ["userid"]
            isOneToOne: false
            referencedRelation: "controllers"
            referencedColumns: ["controllerid"]
          },
        ]
      }
      orderstatus: {
        Row: {
          notes: string | null
          orderid: number | null
          orderstatusid: number
          status: Database["public"]["Enums"]["statusenum"]
          statusdate: string | null
          updatedby: number | null
          userrole: Database["public"]["Enums"]["userroleenum"] | null
        }
        Insert: {
          notes?: string | null
          orderid?: number | null
          orderstatusid?: number
          status: Database["public"]["Enums"]["statusenum"]
          statusdate?: string | null
          updatedby?: number | null
          userrole?: Database["public"]["Enums"]["userroleenum"] | null
        }
        Update: {
          notes?: string | null
          orderid?: number | null
          orderstatusid?: number
          status?: Database["public"]["Enums"]["statusenum"]
          statusdate?: string | null
          updatedby?: number | null
          userrole?: Database["public"]["Enums"]["userroleenum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "orderstatus_orderid_fkey"
            columns: ["orderid"]
            isOneToOne: false
            referencedRelation: "clientorders"
            referencedColumns: ["orderid"]
          },
        ]
      }
      performancehistory: {
        Row: {
          createdat: string | null
          historyid: number
          merchandiseid: number | null
          metricdate: string | null
          metrictype: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue: number | null
          notes: string | null
          tasktype: Database["public"]["Enums"]["ordertypeenum"] | null
          userid: number
          userrole: Database["public"]["Enums"]["userroleenum"]
          zoneid: number | null
        }
        Insert: {
          createdat?: string | null
          historyid?: number
          merchandiseid?: number | null
          metricdate?: string | null
          metrictype: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue?: number | null
          notes?: string | null
          tasktype?: Database["public"]["Enums"]["ordertypeenum"] | null
          userid: number
          userrole: Database["public"]["Enums"]["userroleenum"]
          zoneid?: number | null
        }
        Update: {
          createdat?: string | null
          historyid?: number
          merchandiseid?: number | null
          metricdate?: string | null
          metrictype?: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue?: number | null
          notes?: string | null
          tasktype?: Database["public"]["Enums"]["ordertypeenum"] | null
          userid?: number
          userrole?: Database["public"]["Enums"]["userroleenum"]
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "performancehistory_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "performancehistory_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
      performancemetrics: {
        Row: {
          createdat: string | null
          merchandiseid: number | null
          metricdate: string | null
          metricid: number
          metrictype: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue: number | null
          notes: string | null
          tasktype: Database["public"]["Enums"]["ordertypeenum"] | null
          userid: number
          userrole: Database["public"]["Enums"]["userroleenum"]
          zoneid: number | null
        }
        Insert: {
          createdat?: string | null
          merchandiseid?: number | null
          metricdate?: string | null
          metricid?: number
          metrictype: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue?: number | null
          notes?: string | null
          tasktype?: Database["public"]["Enums"]["ordertypeenum"] | null
          userid: number
          userrole: Database["public"]["Enums"]["userroleenum"]
          zoneid?: number | null
        }
        Update: {
          createdat?: string | null
          merchandiseid?: number | null
          metricdate?: string | null
          metricid?: number
          metrictype?: Database["public"]["Enums"]["reportperiodenum"]
          metricvalue?: number | null
          notes?: string | null
          tasktype?: Database["public"]["Enums"]["ordertypeenum"] | null
          userid?: number
          userrole?: Database["public"]["Enums"]["userroleenum"]
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "performancemetrics_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "performancemetrics_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
      permissions: {
        Row: {
          createdat: string | null
          isactive: boolean | null
          notes: string | null
          permissionid: number
          permissiontype: Database["public"]["Enums"]["permissiontypeenum"]
          resourcetype: Database["public"]["Enums"]["resourcetypeenum"]
          updatedat: string | null
          userrole: Database["public"]["Enums"]["userroleenum"]
        }
        Insert: {
          createdat?: string | null
          isactive?: boolean | null
          notes?: string | null
          permissionid?: number
          permissiontype: Database["public"]["Enums"]["permissiontypeenum"]
          resourcetype: Database["public"]["Enums"]["resourcetypeenum"]
          updatedat?: string | null
          userrole: Database["public"]["Enums"]["userroleenum"]
        }
        Update: {
          createdat?: string | null
          isactive?: boolean | null
          notes?: string | null
          permissionid?: number
          permissiontype?: Database["public"]["Enums"]["permissiontypeenum"]
          resourcetype?: Database["public"]["Enums"]["resourcetypeenum"]
          updatedat?: string | null
          userrole?: Database["public"]["Enums"]["userroleenum"]
        }
        Relationships: []
      }
      realtimeupdates: {
        Row: {
          controllerid: number | null
          driverid: number | null
          merchandiseid: number | null
          notes: string | null
          taskid: number | null
          updateid: number
          updatestatus: Database["public"]["Enums"]["statusenum"]
          updatetime: string | null
          updatetype: Database["public"]["Enums"]["ordertypeenum"]
          zoneid: number | null
        }
        Insert: {
          controllerid?: number | null
          driverid?: number | null
          merchandiseid?: number | null
          notes?: string | null
          taskid?: number | null
          updateid?: number
          updatestatus: Database["public"]["Enums"]["statusenum"]
          updatetime?: string | null
          updatetype: Database["public"]["Enums"]["ordertypeenum"]
          zoneid?: number | null
        }
        Update: {
          controllerid?: number | null
          driverid?: number | null
          merchandiseid?: number | null
          notes?: string | null
          taskid?: number | null
          updateid?: number
          updatestatus?: Database["public"]["Enums"]["statusenum"]
          updatetime?: string | null
          updatetype?: Database["public"]["Enums"]["ordertypeenum"]
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "realtimeupdates_controllerid_fkey"
            columns: ["controllerid"]
            isOneToOne: false
            referencedRelation: "controllers"
            referencedColumns: ["controllerid"]
          },
          {
            foreignKeyName: "realtimeupdates_driverid_fkey"
            columns: ["driverid"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["driverid"]
          },
          {
            foreignKeyName: "realtimeupdates_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "realtimeupdates_taskid_fkey"
            columns: ["taskid"]
            isOneToOne: false
            referencedRelation: "drivertasks"
            referencedColumns: ["taskid"]
          },
          {
            foreignKeyName: "realtimeupdates_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
      reports: {
        Row: {
          generatedat: string | null
          generatedby: number | null
          notes: string | null
          reportdata: string | null
          reportid: number
          reportperiod: Database["public"]["Enums"]["reportperiodenum"] | null
          reporttype: Database["public"]["Enums"]["reporttypeenum"]
          userrole: Database["public"]["Enums"]["userroleenum"] | null
        }
        Insert: {
          generatedat?: string | null
          generatedby?: number | null
          notes?: string | null
          reportdata?: string | null
          reportid?: number
          reportperiod?: Database["public"]["Enums"]["reportperiodenum"] | null
          reporttype: Database["public"]["Enums"]["reporttypeenum"]
          userrole?: Database["public"]["Enums"]["userroleenum"] | null
        }
        Update: {
          generatedat?: string | null
          generatedby?: number | null
          notes?: string | null
          reportdata?: string | null
          reportid?: number
          reportperiod?: Database["public"]["Enums"]["reportperiodenum"] | null
          reporttype?: Database["public"]["Enums"]["reporttypeenum"]
          userrole?: Database["public"]["Enums"]["userroleenum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "reports_generatedby_fkey"
            columns: ["generatedby"]
            isOneToOne: false
            referencedRelation: "moderators"
            referencedColumns: ["moderatorid"]
          },
        ]
      }
      stockingorders: {
        Row: {
          assignedcontrollerid: number | null
          assigneddriverid: number | null
          merchandiseid: number | null
          notes: string | null
          orderid: number | null
          quantity: number | null
          status: Database["public"]["Enums"]["statusenum"] | null
          stockdate: string | null
          stockingorderid: number
          zoneid: number | null
        }
        Insert: {
          assignedcontrollerid?: number | null
          assigneddriverid?: number | null
          merchandiseid?: number | null
          notes?: string | null
          orderid?: number | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["statusenum"] | null
          stockdate?: string | null
          stockingorderid?: number
          zoneid?: number | null
        }
        Update: {
          assignedcontrollerid?: number | null
          assigneddriverid?: number | null
          merchandiseid?: number | null
          notes?: string | null
          orderid?: number | null
          quantity?: number | null
          status?: Database["public"]["Enums"]["statusenum"] | null
          stockdate?: string | null
          stockingorderid?: number
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "stockingorders_assignedcontrollerid_fkey"
            columns: ["assignedcontrollerid"]
            isOneToOne: false
            referencedRelation: "controllers"
            referencedColumns: ["controllerid"]
          },
          {
            foreignKeyName: "stockingorders_assigneddriverid_fkey"
            columns: ["assigneddriverid"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["driverid"]
          },
          {
            foreignKeyName: "stockingorders_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "stockingorders_orderid_fkey"
            columns: ["orderid"]
            isOneToOne: false
            referencedRelation: "clientorders"
            referencedColumns: ["orderid"]
          },
          {
            foreignKeyName: "stockingorders_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
      storageconditions: {
        Row: {
          conditionid: number
          createdat: string | null
          humiditymax: number | null
          humiditymin: number | null
          merchandiseid: number | null
          notes: string | null
          temperaturemax: number | null
          temperaturemin: number | null
          updatedat: string | null
        }
        Insert: {
          conditionid?: number
          createdat?: string | null
          humiditymax?: number | null
          humiditymin?: number | null
          merchandiseid?: number | null
          notes?: string | null
          temperaturemax?: number | null
          temperaturemin?: number | null
          updatedat?: string | null
        }
        Update: {
          conditionid?: number
          createdat?: string | null
          humiditymax?: number | null
          humiditymin?: number | null
          merchandiseid?: number | null
          notes?: string | null
          temperaturemax?: number | null
          temperaturemin?: number | null
          updatedat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "storageconditions_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
        ]
      }
      supplementaryinformation: {
        Row: {
          createdat: string | null
          infotype: string
          infovalue: string
          merchandiseid: number | null
          notes: string | null
          supplementaryid: number
          updatedat: string | null
        }
        Insert: {
          createdat?: string | null
          infotype: string
          infovalue: string
          merchandiseid?: number | null
          notes?: string | null
          supplementaryid?: number
          updatedat?: string | null
        }
        Update: {
          createdat?: string | null
          infotype?: string
          infovalue?: string
          merchandiseid?: number | null
          notes?: string | null
          supplementaryid?: number
          updatedat?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "supplementaryinformation_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
        ]
      }
      taskassignments: {
        Row: {
          assignedby: number | null
          assignedto: number | null
          assignmentdate: string | null
          assignmentid: number
          merchandiseid: number | null
          notes: string | null
          status: Database["public"]["Enums"]["statusenum"] | null
          taskid: number | null
          zoneid: number | null
        }
        Insert: {
          assignedby?: number | null
          assignedto?: number | null
          assignmentdate?: string | null
          assignmentid?: number
          merchandiseid?: number | null
          notes?: string | null
          status?: Database["public"]["Enums"]["statusenum"] | null
          taskid?: number | null
          zoneid?: number | null
        }
        Update: {
          assignedby?: number | null
          assignedto?: number | null
          assignmentdate?: string | null
          assignmentid?: number
          merchandiseid?: number | null
          notes?: string | null
          status?: Database["public"]["Enums"]["statusenum"] | null
          taskid?: number | null
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "taskassignments_assignedby_fkey"
            columns: ["assignedby"]
            isOneToOne: false
            referencedRelation: "moderators"
            referencedColumns: ["moderatorid"]
          },
          {
            foreignKeyName: "taskassignments_assignedto_fkey"
            columns: ["assignedto"]
            isOneToOne: false
            referencedRelation: "drivers"
            referencedColumns: ["driverid"]
          },
          {
            foreignKeyName: "taskassignments_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "taskassignments_taskid_fkey"
            columns: ["taskid"]
            isOneToOne: false
            referencedRelation: "drivertasks"
            referencedColumns: ["taskid"]
          },
          {
            foreignKeyName: "taskassignments_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
      tasks: {
        Row: {
          deadline: string
          driver_id: number | null
          id: number
          location: string
          notes: string | null
          priority: string
          status: string
          tasktype: string
        }
        Insert: {
          deadline: string
          driver_id?: number | null
          id?: number
          location: string
          notes?: string | null
          priority: string
          status?: string
          tasktype: string
        }
        Update: {
          deadline?: string
          driver_id?: number | null
          id?: number
          location?: string
          notes?: string | null
          priority?: string
          status?: string
          tasktype?: string
        }
        Relationships: []
      }
      taskstatus: {
        Row: {
          notes: string | null
          status: Database["public"]["Enums"]["taskstatusenum"]
          statusdate: string | null
          statusid: number
          taskid: number | null
          updatedby: number | null
          userrole: Database["public"]["Enums"]["userroleenum"] | null
        }
        Insert: {
          notes?: string | null
          status: Database["public"]["Enums"]["taskstatusenum"]
          statusdate?: string | null
          statusid?: number
          taskid?: number | null
          updatedby?: number | null
          userrole?: Database["public"]["Enums"]["userroleenum"] | null
        }
        Update: {
          notes?: string | null
          status?: Database["public"]["Enums"]["taskstatusenum"]
          statusdate?: string | null
          statusid?: number
          taskid?: number | null
          updatedby?: number | null
          userrole?: Database["public"]["Enums"]["userroleenum"] | null
        }
        Relationships: [
          {
            foreignKeyName: "taskstatus_taskid_fkey"
            columns: ["taskid"]
            isOneToOne: false
            referencedRelation: "drivertasks"
            referencedColumns: ["taskid"]
          },
        ]
      }
      user_notification_preferences: {
        Row: {
          created_at: string | null
          email_notifications: boolean | null
          feedback_notifications: boolean | null
          new_assignments: boolean | null
          sms_notifications: boolean | null
          system_updates: boolean | null
          updated_at: string | null
          urgent_alerts: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email_notifications?: boolean | null
          feedback_notifications?: boolean | null
          new_assignments?: boolean | null
          sms_notifications?: boolean | null
          system_updates?: boolean | null
          updated_at?: string | null
          urgent_alerts?: boolean | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email_notifications?: boolean | null
          feedback_notifications?: boolean | null
          new_assignments?: boolean | null
          sms_notifications?: boolean | null
          system_updates?: boolean | null
          updated_at?: string | null
          urgent_alerts?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          bio: string | null
          created_at: string | null
          department: string | null
          email: string | null
          first_name: string | null
          job_title: string | null
          last_name: string | null
          phone: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          job_title?: string | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          department?: string | null
          email?: string | null
          first_name?: string | null
          job_title?: string | null
          last_name?: string | null
          phone?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_security_settings: {
        Row: {
          created_at: string | null
          session_timeout: number | null
          two_factor_auth: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          session_timeout?: number | null
          two_factor_auth?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          session_timeout?: number | null
          two_factor_auth?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      userroles: {
        Row: {
          createdat: string | null
          createdby: number | null
          description: string | null
          isactive: boolean | null
          notes: string | null
          roleid: number
          rolename: Database["public"]["Enums"]["userroleenum"]
          updatedat: string | null
          updatedby: number | null
        }
        Insert: {
          createdat?: string | null
          createdby?: number | null
          description?: string | null
          isactive?: boolean | null
          notes?: string | null
          roleid?: number
          rolename: Database["public"]["Enums"]["userroleenum"]
          updatedat?: string | null
          updatedby?: number | null
        }
        Update: {
          createdat?: string | null
          createdby?: number | null
          description?: string | null
          isactive?: boolean | null
          notes?: string | null
          roleid?: number
          rolename?: Database["public"]["Enums"]["userroleenum"]
          updatedat?: string | null
          updatedby?: number | null
        }
        Relationships: []
      }
      workers: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          date_of_birth: string | null
          department: string | null
          email: string
          employment_type: string | null
          first_name: string
          gender: string | null
          hire_date: string
          job_title: string
          last_name: string
          phone_number: string | null
          salary: number | null
          status: string | null
          supervisor_id: number | null
          updated_at: string | null
          worker_id: number
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string | null
          email: string
          employment_type?: string | null
          first_name: string
          gender?: string | null
          hire_date: string
          job_title: string
          last_name: string
          phone_number?: string | null
          salary?: number | null
          status?: string | null
          supervisor_id?: number | null
          updated_at?: string | null
          worker_id?: number
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          date_of_birth?: string | null
          department?: string | null
          email?: string
          employment_type?: string | null
          first_name?: string
          gender?: string | null
          hire_date?: string
          job_title?: string
          last_name?: string
          phone_number?: string | null
          salary?: number | null
          status?: string | null
          supervisor_id?: number | null
          updated_at?: string | null
          worker_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workers_supervisor_id_fkey"
            columns: ["supervisor_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["worker_id"]
          },
        ]
      }
      zonematricules: {
        Row: {
          createdat: string | null
          matricule: string
          matriculeid: number
          notes: string | null
          status: Database["public"]["Enums"]["statusenum"] | null
          updatedat: string | null
          zoneid: number | null
        }
        Insert: {
          createdat?: string | null
          matricule: string
          matriculeid?: number
          notes?: string | null
          status?: Database["public"]["Enums"]["statusenum"] | null
          updatedat?: string | null
          zoneid?: number | null
        }
        Update: {
          createdat?: string | null
          matricule?: string
          matriculeid?: number
          notes?: string | null
          status?: Database["public"]["Enums"]["statusenum"] | null
          updatedat?: string | null
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "zonematricules_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
      zones: {
        Row: {
          createdat: string | null
          height: number
          humiditymax: number | null
          humiditymin: number | null
          length: number
          matricule: string
          temperaturemax: number | null
          temperaturemin: number | null
          weightcapacity: number
          width: number
          zoneid: number
          zonename: string
          zonetype: Database["public"]["Enums"]["zonetypeenum"]
        }
        Insert: {
          createdat?: string | null
          height: number
          humiditymax?: number | null
          humiditymin?: number | null
          length: number
          matricule: string
          temperaturemax?: number | null
          temperaturemin?: number | null
          weightcapacity: number
          width: number
          zoneid?: number
          zonename: string
          zonetype: Database["public"]["Enums"]["zonetypeenum"]
        }
        Update: {
          createdat?: string | null
          height?: number
          humiditymax?: number | null
          humiditymin?: number | null
          length?: number
          matricule?: string
          temperaturemax?: number | null
          temperaturemin?: number | null
          weightcapacity?: number
          width?: number
          zoneid?: number
          zonename?: string
          zonetype?: Database["public"]["Enums"]["zonetypeenum"]
        }
        Relationships: []
      }
      zonesaturationlevels: {
        Row: {
          merchandiseid: number | null
          notes: string | null
          saturationdate: string | null
          saturationid: number
          saturationlevel: number | null
          zoneid: number | null
        }
        Insert: {
          merchandiseid?: number | null
          notes?: string | null
          saturationdate?: string | null
          saturationid?: number
          saturationlevel?: number | null
          zoneid?: number | null
        }
        Update: {
          merchandiseid?: number | null
          notes?: string | null
          saturationdate?: string | null
          saturationid?: number
          saturationlevel?: number | null
          zoneid?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "zonesaturationlevels_merchandiseid_fkey"
            columns: ["merchandiseid"]
            isOneToOne: false
            referencedRelation: "merchandise"
            referencedColumns: ["merchandiseid"]
          },
          {
            foreignKeyName: "zonesaturationlevels_zoneid_fkey"
            columns: ["zoneid"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["zoneid"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_user_role: {
        Args: { p_user_id: string; p_role: string }
        Returns: undefined
      }
      create_user_profiles_table: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_user_roles_table: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_user_role: {
        Args: { p_user_id: string }
        Returns: string
      }
    }
    Enums: {
      administratorroleenum: "SuperAdmin" | "Admin"
      availabilityenum: "Available" | "Busy"
      clienttypeenum: "Company" | "Individual"
      detailtypeenum: "General" | "Technical" | "Logistical"
      feedbackstatusenum: "Open" | "In Progress" | "Resolved"
      feedbacktypeenum: "Suggestion" | "Complaint" | "General"
      inspectionstatusenum: "Pass" | "Fail" | "Pending"
      notificationtypeenum:
        | "Task Assigned"
        | "Task Completed"
        | "Inspection Required"
        | "Order Update"
        | "System Alert"
      ordertypeenum: "Stocking" | "Destocking"
      permissiontypeenum: "Read" | "Write" | "Read/Write"
      reportperiodenum: "Daily" | "Weekly" | "Monthly" | "Yearly"
      reporttypeenum:
        | "Performance"
        | "Inventory"
        | "Order"
        | "ZoneSaturation"
        | "DriverActivity"
        | "ControllerInspections"
      resourcetypeenum:
        | "Orders"
        | "Zones"
        | "Merchandise"
        | "Reports"
        | "Tasks"
        | "Inspections"
        | "Feedback"
        | "Clients"
        | "Drivers"
        | "Controllers"
        | "Moderators"
      statusenum:
        | "Pending"
        | "Validated"
        | "Completed"
        | "Cancelled"
        | "Not Distributed"
        | "Active"
      StatusEnum: "Not Distributed" | "Distributed" | "Pending" | "Cancelled"
      taskstatusenum: "Pending" | "In Progress" | "Completed" | "Cancelled"
      userroleenum: "Administrator" | "Moderator" | "Driver" | "Controller"
      zonetypeenum: "Rack Storage" | "Bulk Storage"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      administratorroleenum: ["SuperAdmin", "Admin"],
      availabilityenum: ["Available", "Busy"],
      clienttypeenum: ["Company", "Individual"],
      detailtypeenum: ["General", "Technical", "Logistical"],
      feedbackstatusenum: ["Open", "In Progress", "Resolved"],
      feedbacktypeenum: ["Suggestion", "Complaint", "General"],
      inspectionstatusenum: ["Pass", "Fail", "Pending"],
      notificationtypeenum: [
        "Task Assigned",
        "Task Completed",
        "Inspection Required",
        "Order Update",
        "System Alert",
      ],
      ordertypeenum: ["Stocking", "Destocking"],
      permissiontypeenum: ["Read", "Write", "Read/Write"],
      reportperiodenum: ["Daily", "Weekly", "Monthly", "Yearly"],
      reporttypeenum: [
        "Performance",
        "Inventory",
        "Order",
        "ZoneSaturation",
        "DriverActivity",
        "ControllerInspections",
      ],
      resourcetypeenum: [
        "Orders",
        "Zones",
        "Merchandise",
        "Reports",
        "Tasks",
        "Inspections",
        "Feedback",
        "Clients",
        "Drivers",
        "Controllers",
        "Moderators",
      ],
      statusenum: [
        "Pending",
        "Validated",
        "Completed",
        "Cancelled",
        "Not Distributed",
        "Active",
      ],
      StatusEnum: ["Not Distributed", "Distributed", "Pending", "Cancelled"],
      taskstatusenum: ["Pending", "In Progress", "Completed", "Cancelled"],
      userroleenum: ["Administrator", "Moderator", "Driver", "Controller"],
      zonetypeenum: ["Rack Storage", "Bulk Storage"],
    },
  },
} as const

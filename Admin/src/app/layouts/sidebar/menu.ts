import { MenuItem } from "./menu.model";

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },

    {
        id: 2,
        label: 'MENUITEMS.DASHBOARD.TEXT',
        icon: 'ti ti-brand-google-home',
        subItems: [
            {
                id: 3,
                label: 'MENUITEMS.DASHBOARD.LIST.ANALYTICS',
                link: '/',
                parentId: 2
            },

         
         
            {
                id: 5,
                label: 'MENUITEMS.DASHBOARD.LIST.ECOMMERCE',
                link: '/ecommerce',
                parentId: 2
            }
        ]
    },
 
   

    {
        id: 175,
        label: 'SUPPLIER',
        icon: 'ti ti-brand-google-home',
        subItems: [

            {
                id: 177,
                label: 'ADD SUPPLIER',
                link: '/Supplier/addsupplier',
                parentId: 175
            },  
            {
                id: 176,
                label: 'TABLE SUPPLIER',
                link: '/Supplier/tablesupplier',
                parentId: 175
            },  
        ]

        },
{
        id: 178,
        label: 'CONTRAT',
        icon: 'ti ti-brand-google-home',
        subItems: [

            {
                id: 179,
                label: ' Contract',
                link: '/Contrat/contratlist',
                parentId: 178
            }, 
            
            {
                id: 180,
                label: ' ADD CONTRACT',
                link: '/Contrat/AjoutContrat',
                parentId: 178
            }, 
            
           
        ]

        },

        {
            id: 190,
            label: 'NOTIFICATIONS',
            icon: 'ti ti-brand-google-home',
            subItems: [
    
                {
                    id: 181,
                    label: ' ADD NOTIFCATION',
                    link: '/notif/Ajoutnotif',
                    parentId: 190
                }, 
                {
                    id: 182,
                    label: '  NOTIFCATIONS',
                    link: '/notif/ListNotif',
                    parentId: 190
                }, 
             
                
               
            ]
    
            },
   
            {
                id: 191,
                label: 'DOCUMENT',
                icon: 'ti ti-brand-google-home',
                subItems: [
        
                    {
                        id: 192,
                        label: ' UPLOAD DOCUMENT',
                        link: '/doc/upload',
                        parentId: 191
                    }, 
                    
                 
                    
                   
                ]
        
                },


             
            
                   
]
const CHECKLISTS = {
  "daily": {
    "id": "daily",
    "title": "Daily Operations Log",
    "subtitle": "1301 Pleasant Valley Rd, Greenup, KY",
    "sections": [
      {
        "id": "header",
        "title": "Shift Info",
        "phase": "start",
        "fields": [
          {
            "id": "date",
            "label": "Date",
            "type": "date"
          },
          {
            "id": "crew_lead",
            "label": "Crew Lead",
            "type": "text"
          },
          {
            "id": "crew_member",
            "label": "Crew Member",
            "type": "text"
          }
        ]
      },
      {
        "id": "equipment",
        "title": "Safety & Equipment Ready",
        "phase": "start",
        "fields": [
          {
            "id": "chainsaw_ready",
            "label": "Chainsaws -- Chain tension, bar oil, fuel",
            "type": "check",
            "hasNotes": true
          },
          {
            "id": "splitter_ready",
            "label": "Splitter -- Fluid levels, wedge, guards",
            "type": "check",
            "hasNotes": true
          },
          {
            "id": "excavator_ready",
            "label": "Excavator -- Walk-around complete",
            "type": "check",
            "hasNotes": true,
            "hasHours": true
          },
          {
            "id": "tractor_ready",
            "label": "Tractor -- Walk-around complete",
            "type": "check",
            "hasNotes": true,
            "hasHours": true
          }
        ]
      },
      {
        "id": "ppe",
        "title": "PPE Check",
        "phase": "start",
        "layout": "ppe",
        "fields": [
          {
            "id": "ppe_lead",
            "label": "Crew Lead",
            "type": "ppe_row",
            "items": [
              "Chaps",
              "Gloves",
              "Eye",
              "Ear"
            ]
          },
          {
            "id": "ppe_member",
            "label": "Crew Member",
            "type": "ppe_row",
            "items": [
              "Chaps",
              "Gloves",
              "Eye",
              "Ear"
            ]
          },
          {
            "id": "first_aid_verified",
            "label": "First Aid Kit location verified",
            "type": "check"
          },
          {
            "id": "first_aid_location",
            "label": "Location",
            "type": "text"
          }
        ]
      },
      {
        "id": "work_area",
        "title": "Work Area Ready",
        "phase": "start",
        "fields": [
          {
            "id": "pre_clean",
            "label": "Pre-production cleaning done",
            "type": "yesno",
            "hasNotes": true
          },
          {
            "id": "log_inventory",
            "label": "Log inventory adequate for today",
            "type": "yesno",
            "hasNotes": true
          },
          {
            "id": "daily_goal",
            "label": "Today goal (cords)",
            "type": "text"
          },
          {
            "id": "species_focus",
            "label": "Species focus",
            "type": "text"
          }
        ]
      },
      {
        "id": "production",
        "title": "Production Results",
        "phase": "end",
        "fields": [
          {
            "id": "cords_split",
            "label": "Cords split today",
            "type": "number"
          },
          {
            "id": "pallets_completed",
            "label": "Pallets completed",
            "type": "number"
          },
          {
            "id": "species_oak_hick",
            "label": "Oak/Hick Mix",
            "type": "number"
          },
          {
            "id": "species_cherry",
            "label": "Cherry",
            "type": "number"
          },
          {
            "id": "species_hickory",
            "label": "Hickory",
            "type": "number"
          },
          {
            "id": "species_other",
            "label": "Other",
            "type": "number"
          },
          {
            "id": "goal_met",
            "label": "Did we hit goal?",
            "type": "yesno",
            "hasNotes": true
          }
        ]
      },
      {
        "id": "quality",
        "title": "Quality Check",
        "phase": "end",
        "fields": [
          {
            "id": "consistent_size",
            "label": "Splits are consistent size",
            "type": "check"
          },
          {
            "id": "no_rot",
            "label": "No rot or punky wood in finished pallets",
            "type": "check"
          },
          {
            "id": "stacked_properly",
            "label": "Stacked properly for seasoning",
            "type": "check"
          }
        ]
      },
      {
        "id": "equip_end",
        "title": "Equipment End-of-Day",
        "phase": "end",
        "fields": [
          {
            "id": "excavator_end_hrs",
            "label": "Excavator end hours",
            "type": "text",
            "hasNotes": true
          },
          {
            "id": "tractor_end_hrs",
            "label": "Tractor end hours",
            "type": "text",
            "hasNotes": true
          },
          {
            "id": "splitter_end_hrs",
            "label": "Splitter hours run",
            "type": "text",
            "hasNotes": true
          },
          {
            "id": "maintenance_done",
            "label": "Maintenance performed today",
            "type": "textarea"
          },
          {
            "id": "equip_issues",
            "label": "Equipment issues for shop",
            "type": "textarea"
          }
        ]
      },
      {
        "id": "cleanup",
        "title": "Post-Production Cleaning",
        "phase": "end",
        "fields": [
          {
            "id": "area_cleaned",
            "label": "Work area cleaned",
            "type": "yesno",
            "hasNotes": true
          }
        ]
      },
      {
        "id": "safety_end",
        "title": "Safety & Incidents",
        "phase": "end",
        "fields": [
          {
            "id": "near_misses",
            "label": "Any near misses today?",
            "type": "yesno_reverse",
            "hasNotes": true
          },
          {
            "id": "injuries",
            "label": "Any injuries?",
            "type": "yesno_reverse",
            "hasNotes": true
          }
        ]
      },
      {
        "id": "tomorrow",
        "title": "Tomorrow Prep",
        "phase": "end",
        "fields": [
          {
            "id": "logs_staged",
            "label": "Logs staged for morning",
            "type": "check"
          },
          {
            "id": "weather_concern",
            "label": "Weather concern",
            "type": "yesno_reverse",
            "hasNotes": true
          },
          {
            "id": "notes_tomorrow",
            "label": "Notes for tomorrow/office",
            "type": "textarea"
          }
        ]
      }
    ]
  },
  "weekly": {
    "id": "weekly",
    "title": "Weekly Checklist",
    "subtitle": "Complete every Friday/Saturday",
    "sections": [
      {
        "id": "week_info",
        "title": "Week Info",
        "fields": [
          {
            "id": "week_start",
            "label": "Week of",
            "type": "date"
          },
          {
            "id": "week_end",
            "label": "To",
            "type": "date"
          },
          {
            "id": "completed_by",
            "label": "Completed by",
            "type": "text"
          }
        ]
      },
      {
        "id": "chainsaws",
        "title": "Chainsaws -- Complete Service",
        "icon": "wrench",
        "fields": [
          {
            "id": "spark_plug",
            "label": "Spark plug check/replace",
            "type": "check"
          },
          {
            "id": "air_filter",
            "label": "Air filter clean/replace",
            "type": "check"
          },
          {
            "id": "fuel_filter",
            "label": "Fuel filter check",
            "type": "check"
          },
          {
            "id": "bar_chain_cond",
            "label": "Bar and chain condition",
            "type": "check"
          },
          {
            "id": "chains_sharpened",
            "label": "Chains sharpened this week",
            "type": "number"
          },
          {
            "id": "chains_replaced",
            "label": "Chains replaced",
            "type": "number"
          }
        ]
      },
      {
        "id": "splitter_maint",
        "title": "Hydraulic Splitter -- Full Inspection",
        "icon": "wrench",
        "fields": [
          {
            "id": "rams_inspected",
            "label": "Hydraulic rams inspected (no leaks)",
            "type": "check"
          },
          {
            "id": "valves_tested",
            "label": "Valves tested and cleaned",
            "type": "check"
          },
          {
            "id": "filters_checked",
            "label": "Filters checked/replaced",
            "type": "check"
          },
          {
            "id": "fluid_topped",
            "label": "Hydraulic fluid level topped off",
            "type": "check"
          },
          {
            "id": "wedge_cond",
            "label": "Wedge condition",
            "type": "select",
            "options": [
              "Good",
              "Recondition Requested"
            ]
          },
          {
            "id": "fluid_added",
            "label": "Fluid added (quarts)",
            "type": "number"
          },
          {
            "id": "splitter_issues",
            "label": "Issues",
            "type": "textarea"
          }
        ]
      },
      {
        "id": "heavy_equip",
        "title": "Excavator/Tractor Service",
        "icon": "wrench",
        "fields": [
          {
            "id": "grease_points",
            "label": "All grease points lubricated",
            "type": "check"
          },
          {
            "id": "oil_checked",
            "label": "Oil level checked/changed",
            "type": "check"
          },
          {
            "id": "oil_due",
            "label": "Oil change due",
            "type": "text"
          },
          {
            "id": "filter_changes",
            "label": "Filter changes (if scheduled)",
            "type": "check"
          },
          {
            "id": "track_tire_cond",
            "label": "Track/tire condition",
            "type": "select",
            "options": [
              "Good",
              "Needs Attention"
            ]
          },
          {
            "id": "hydraulic_check",
            "label": "Hydraulic system check",
            "type": "check"
          },
          {
            "id": "hours_this_week",
            "label": "Hours this week",
            "type": "number"
          },
          {
            "id": "total_hours",
            "label": "Total hours",
            "type": "number"
          },
          {
            "id": "next_service",
            "label": "Next service due",
            "type": "text"
          },
          {
            "id": "heavy_issues",
            "label": "Issues/repairs needed",
            "type": "textarea"
          }
        ]
      },
      {
        "id": "backup",
        "title": "Backup Equipment Test",
        "icon": "wrench",
        "fields": [
          {
            "id": "backup_saw",
            "label": "Backup chainsaw started and tested",
            "type": "check"
          },
          {
            "id": "backup_splitter",
            "label": "Backup splitter functionality check",
            "type": "check"
          },
          {
            "id": "backup_ready",
            "label": "All backup equipment ready for use",
            "type": "check"
          },
          {
            "id": "equip_notes",
            "label": "Notes",
            "type": "textarea"
          }
        ]
      },
      {
        "id": "production_review",
        "title": "Weekly Production Review",
        "icon": "chart",
        "fields": [
          {
            "id": "total_pallets",
            "label": "Total pallets produced",
            "type": "number"
          },
          {
            "id": "total_cords",
            "label": "Total cords",
            "type": "number"
          },
          {
            "id": "days_worked",
            "label": "Days worked",
            "type": "number"
          },
          {
            "id": "avg_per_day",
            "label": "Average cords/day",
            "type": "number"
          },
          {
            "id": "goal_status",
            "label": "Goal met?",
            "type": "select",
            "options": [
              "Yes - Exceeded",
              "Yes - On target",
              "No - Below"
            ]
          },
          {
            "id": "crew_size",
            "label": "Crew worked",
            "type": "select",
            "options": [
              "2-person all week",
              "3-person all week",
              "Mixed"
            ]
          },
          {
            "id": "prod_notes",
            "label": "Notes/Issues affecting production",
            "type": "textarea"
          }
        ]
      },
      {
        "id": "inventory",
        "title": "Inventory & Planning",
        "icon": "package",
        "fields": [
          {
            "id": "raw_supply",
            "label": "Current raw log supply",
            "type": "select",
            "options": [
              "2+ weeks",
              "1-2 weeks",
              "Less than 1 week",
              "CRITICAL"
            ]
          },
          {
            "id": "order_status",
            "label": "Order status",
            "type": "select",
            "options": [
              "Order placed",
              "Need to order",
              "Delivery scheduled"
            ]
          },
          {
            "id": "delivery_date",
            "label": "Delivery scheduled date",
            "type": "text"
          },
          {
            "id": "pallets_ready",
            "label": "Pallets ready for delivery",
            "type": "number"
          },
          {
            "id": "seasoning_cords",
            "label": "Cords seasoning in progress",
            "type": "number"
          },
          {
            "id": "inv_oak",
            "label": "Oak (finished)",
            "type": "number"
          },
          {
            "id": "inv_hickory",
            "label": "Hickory (finished)",
            "type": "number"
          },
          {
            "id": "inv_cherry",
            "label": "Cherry (finished)",
            "type": "number"
          },
          {
            "id": "inv_other",
            "label": "Other (finished)",
            "type": "number"
          },
          {
            "id": "next_delivery",
            "label": "Next week delivery schedule",
            "type": "textarea"
          },
          {
            "id": "next_target",
            "label": "Next week production target (cords)",
            "type": "number"
          },
          {
            "id": "next_crew",
            "label": "Crew size planned",
            "type": "select",
            "options": [
              "2-person",
              "3-person"
            ]
          }
        ]
      },
      {
        "id": "safety_weekly",
        "title": "Safety & Training",
        "icon": "warning",
        "fields": [
          {
            "id": "no_incidents",
            "label": "No incidents this week",
            "type": "check"
          },
          {
            "id": "near_miss_count",
            "label": "Near misses reported",
            "type": "number"
          },
          {
            "id": "injury_count",
            "label": "Injuries",
            "type": "number"
          },
          {
            "id": "safety_topic",
            "label": "Safety topic covered",
            "type": "text"
          },
          {
            "id": "cross_training",
            "label": "Cross-training completed",
            "type": "text"
          },
          {
            "id": "ppe_good",
            "label": "All PPE in good condition",
            "type": "check"
          },
          {
            "id": "ppe_replacements",
            "label": "Replacements needed",
            "type": "textarea"
          },
          {
            "id": "first_aid_restocked",
            "label": "First aid kit restocked",
            "type": "check"
          },
          {
            "id": "contacts_posted",
            "label": "Emergency contacts posted and current",
            "type": "check"
          },
          {
            "id": "extinguisher_checked",
            "label": "Fire extinguisher checked (monthly)",
            "type": "check"
          }
        ]
      },
      {
        "id": "quality_weekly",
        "title": "Quality Control",
        "icon": "check",
        "fields": [
          {
            "id": "mc_sample1",
            "label": "Moisture Sample 1 (%)",
            "type": "number"
          },
          {
            "id": "mc_sample2",
            "label": "Moisture Sample 2 (%)",
            "type": "number"
          },
          {
            "id": "mc_sample3",
            "label": "Moisture Sample 3 (%)",
            "type": "number"
          },
          {
            "id": "mc_avg",
            "label": "Average (%)",
            "type": "number"
          },
          {
            "id": "mc_status",
            "label": "Status",
            "type": "select",
            "options": [
              "Acceptable",
              "Needs More Seasoning"
            ]
          },
          {
            "id": "ambient_rh",
            "label": "Ambient RH",
            "type": "text"
          },
          {
            "id": "ambient_temp",
            "label": "Ambient Temp",
            "type": "text"
          },
          {
            "id": "no_complaints",
            "label": "No quality complaints this week",
            "type": "check"
          },
          {
            "id": "customer_feedback",
            "label": "Customer feedback received",
            "type": "textarea"
          },
          {
            "id": "seasoning_organized",
            "label": "Seasoning area organized and properly stacked",
            "type": "check"
          },
          {
            "id": "rotation_followed",
            "label": "Rotation system followed",
            "type": "check"
          },
          {
            "id": "weather_protected",
            "label": "Covered/protected from weather",
            "type": "check"
          }
        ]
      },
      {
        "id": "summary",
        "title": "Weekly Summary",
        "icon": "refresh",
        "fields": [
          {
            "id": "wins",
            "label": "Wins this week",
            "type": "textarea"
          },
          {
            "id": "challenges",
            "label": "Challenges/Issues",
            "type": "textarea"
          },
          {
            "id": "action_1",
            "label": "Action item 1",
            "type": "text"
          },
          {
            "id": "action_2",
            "label": "Action item 2",
            "type": "text"
          },
          {
            "id": "action_3",
            "label": "Action item 3",
            "type": "text"
          },
          {
            "id": "seasonal_adj",
            "label": "Seasonal adjustments needed",
            "type": "textarea"
          }
        ]
      }
    ]
  }
};
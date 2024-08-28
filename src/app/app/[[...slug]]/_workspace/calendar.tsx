"use client";

import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CALENDAR_UNDER_DEVELOPMENT } from "@/constants/under-development";
import { CalendarIcon, Construction } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const localizer = momentLocalizer(moment);

export const Timeline = () => {
  const calendarUnderDevelopment = CALENDAR_UNDER_DEVELOPMENT;

  if (calendarUnderDevelopment) {
    return (
      <div className="flex h-full w-full flex-col space-y-6">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          <p className="!mt-0 text-sm text-muted-foreground">
            Featured templates
          </p>
        </div>
        <div className="flex h-full w-full flex-1 flex-col items-center justify-center">
          <Construction className="h-40 w-40 items-center justify-center text-muted-foreground" />
          <p className="text-muted-foreground">Calendar is under development</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center space-x-2">
        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
        <p className="!mt-0 text-sm text-muted-foreground">Upcoming events</p>
      </div>
      <AnimatePresence>
        <motion.div
          key="timeline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <Calendar
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
};

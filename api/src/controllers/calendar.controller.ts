import { Response } from "express";
import calendarService from "../services/calendar.service";
import type { AuthRequest } from "../middlewares/auth.middleware";

class CalendarController {
  async create(req: AuthRequest, res: Response) {
    const calendarEntry = await calendarService.createCalendarEntry(
      req.user?.id_user ?? "",
      req.body,
    );

    res.status(201).json(calendarEntry);
  }

  async getAll(req: AuthRequest, res: Response) {
    const calendarEntries = await calendarService.getCalendarEntries(
      req.user?.id_user ?? "",
    );

    res.json(calendarEntries);
  }

  async getOne(req: AuthRequest, res: Response) {
    const calendarEntry = await calendarService.getCalendarEntry(
      req.params.id,
      req.user?.id_user ?? "",
    );

    res.json(calendarEntry);
  }

  async update(req: AuthRequest, res: Response) {
    const calendarEntry = await calendarService.updateCalendarEntry(
      req.params.id,
      req.user?.id_user ?? "",
      req.body,
    );

    res.json(calendarEntry);
  }

  async delete(req: AuthRequest, res: Response) {
    await calendarService.deleteCalendarEntry(
      req.params.id,
      req.user?.id_user ?? "",
    );

    res.json({ message: "Calendar entry deleted" });
  }
}

export default new CalendarController();

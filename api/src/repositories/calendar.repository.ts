import sequelize from "../config/database";

interface CalendarInput {
  title: string;
  text: string;
  date: string;
  emisor: string;
  receptor?: string[];
  role?: string | null;
  hour?: string | null;
}

const { Calendar } = sequelize.models;

class CalendarRepository {
  async createCalendarEntry(data: CalendarInput) {
    return await Calendar.create({
      ...data,
      receptor: data.receptor ?? [],
      role: data.role ?? null,
      hour: data.hour ?? null,
    });
  }

  async getCalendarEntryById(id: string) {
    return await Calendar.findByPk(id);
  }

  async getAllCalendarEntries() {
    return await Calendar.findAll({
      order: [
        ["date", "ASC"],
        ["hour", "ASC"],
        ["createdAt", "ASC"],
      ],
    });
  }

  async updateCalendarEntry(id: string, data: Partial<CalendarInput>) {
    const calendarEntry = await Calendar.findByPk(id);

    if (!calendarEntry) {
      return null;
    }

    await calendarEntry.update({
      ...data,
      receptor: data.receptor ?? calendarEntry.get("receptor"),
      role: data.role ?? calendarEntry.get("role"),
      hour: data.hour === undefined ? calendarEntry.get("hour") : data.hour,
    });

    return await Calendar.findByPk(id);
  }

  async deleteCalendarEntry(id: string) {
    const calendarEntry = await Calendar.findByPk(id);

    if (!calendarEntry) {
      return null;
    }

    await calendarEntry.destroy();
    return calendarEntry;
  }
}

export default new CalendarRepository();

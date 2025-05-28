import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  eventId: { type: String, required: true, unique: true },
  timestamp: { type: Date, required: true },
  source: { type: String, required: true },
  topic: { type: String, required: true },
  payload: { type: Object, required: true },
  snapshot: { type: Object, required: true },
});

export const EventModel = model("Event", eventSchema);
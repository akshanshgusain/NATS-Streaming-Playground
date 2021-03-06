import nats from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TicketCreatedListner } from "./events/ticket-created-listner";

console.clear();

// Also called client.
const stan = nats.connect("ticketing", randomBytes(4).toString("hex"), {
  url: "https://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listner connected to NATS");

  stan.on("close", () => {
    console.log("NATS connection closed!");
    process.exit();
  });

  new TicketCreatedListner(stan).listen();
});

process.on("SIGINT", () => {
  stan.close();
});

process.on("SIGTERM", () => {
  stan.close();
});

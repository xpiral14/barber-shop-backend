import React from "react";
import {
  Container,
  ClientInfo,
  ServiceType,
  Overlay,
  Available,
} from "./style";

export default function Appointment({ pastTime, time, clientInfo, services }) {
  return (
    <Container>
      <div>
        <h2>{time}</h2>
        {clientInfo ? (
          <ClientInfo>
            {<p>{clientInfo.name}</p>}
            {clientInfo.perfilImage && <img src={clientInfo.perfilImage} />}
          </ClientInfo>
        ) : (
          !pastTime && <Available>Horário disponível</Available>
        )}
      </div>
      <div>
        {clientInfo?.services?.map((service) => (
          <ServiceType>
            <p>{service}</p>
          </ServiceType>
        ))}
      </div>
      {pastTime && <Overlay />}
    </Container>
  );
}

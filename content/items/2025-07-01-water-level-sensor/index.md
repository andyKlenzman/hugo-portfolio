---
date: 2025-07-01T00:00:00Z
tags: [project, embedded]
title: "Water Level Sensor"
description: "Built and tested capacitance-based water level sensor under tight constraints."
draft: false
intro:
  language: "C"
  hardware: "STM32C031C4U6 MCU, Custom PCB"
  tools: "Segger RTT, STM32 Cube IDE"
  hardSkills:
    - "Register Programming"
    - "Performance Optimization"
  softSkills:
    - "Client Communication"
    - "Prioritization under Constraints"
---

I collaborated with hardware and software engineers to develop a proof-of-concept water level sensor based on capacitance, working under strict time and budget constraints.

I worked with my supervisor to build a STM32 provided HAL-based (hardware abstraction layer) version for readability and a direct-register version for performance, ultimately selecting the HAL-based approach after confirming it met performance requirements and would increase the readability of our codebase.

The project was completed on time and budget, with clean documentation and code for the client.

![Water level sensor pcb](water_sensor.png)

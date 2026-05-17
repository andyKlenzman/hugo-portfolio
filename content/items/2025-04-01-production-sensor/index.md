---
date: 2025-04-01T00:00:00Z
tags: [project, embedded]
title: "Production Sensor"
description: "Integrated BG77 LTE modem, AWS communication stack, and testing strategy into an automotive factory prototype."
draft: false
intro:
  language: "C"
  hardware: "EFR32MG24 MCU, BG77 LTE Modem, JLink Debugger"
  protocols: "LTE, HTTPS, MQTT, OTA"
  tools:
    - "Segger RTT"
    - "STM32 Cube IDE"
    - "CMake"
    - "GNU GDB"
  hardSkills:
    - "Modem Integration"
    - "AT Command Parsing"
    - "Low-Power Firmware Design"
  softSkills:
    - "Testing Strategy Design"
    - "Cross-Team Communication"
---

I joined the second revision of a prototype for a major car manufacturer that collected data from 11 sensors and transmitted it to AWS for analysis. This version required LTE instead of Wi-Fi, and I was responsible for integrating the BG77 modem.

I developed a driver for its coprocessor, implemented AT command parsing, HTTPS communication, MQTT messaging, OTA updates, and low-power optimization like limiting the bandwidths we were scanning when registering with our network.

I also helped design and support our testing strategy and integrated a hardware watchdog for reliability and integrated a new BME080 sensor.

The LTE-enabled prototype was completed successfully and is undergoing internal evaluation for potential mass production.

![production sensor pcb](ps_pcb.jpg)

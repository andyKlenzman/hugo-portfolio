---
date: 2025-07-01T00:00:00Z
tags: [project, embedded]
title: "Industrial Humidity Sensor"
description: "Took over and rebuilt firmware for an industrial leakage detection product."
draft: false
intro:
  language: "C, C++, RTOS"
  hardware: "nRF9160, Custom Sensor Multiplexer, PT1000 Sensor, SAADC peripherals"
  protocols: "I²C"
  tools:
    - "Oscilloscope"
    - "Segger RTT"
    - "STM32 Cube IDE"
  hardSkills:
    - "Software Architecture"
    - "Driver Validation"
    - "Circuit Analysis"
  softSkills:
    - "Requirements Interpretation"
    - "Long-Term Maintainability Planning"
---

When a client's industrial humidity and leakage detection product lost its original developers, our embedded team was responsible for rewriting the firmware.

I designed the initial multithreaded firmware structure around an RTOS based on the client's requirement document. I validated the board support package by testing ADC and I²C drivers. I analyzed schematics for the integration of ADC features and GPIO pin control. I also supported many debugging efforts as we approached our final delivery and post delivery.

The requirements changed constantly during this project, and our team was challenged to write code that was easy to debug and validate after making changes, and readable for ourselves and for the client.

![humidity sensor pcb](hs_pcb.jpg)
![humidity sensor debug session](hs_bps_debug.jpg)
![humidity sensor multiplexer](hs_multiplexer.jpg)

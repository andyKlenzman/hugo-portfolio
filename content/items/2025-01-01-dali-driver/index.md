---
date: 2025-01-01T00:00:00Z
tags: [project, embedded]
title: "DALI Driver Refactor"
description: "Refactored DALI driver to improve efficiency and add advanced protocol features for a Zigbee-DALI gateway."
draft: false
intro:
  language: "C"
  hardware: "STM32 MCU, JLink Debugger"
  protocols: "DALI"
  tools:
    - "DALI Network Sniffer"
    - "Segger RTT"
    - "STM32 Cube IDE"
    - "CMake"
    - "GNU GDB"
  hardSkills:
    - "Register Programming"
    - "API Design"
    - "Protocol Implementation"
  softSkills:
    - "Technical Documentation for Client Engineers"
---


I was tasked with refactoring the DALI (Digital Addressable Lighting Interface) driver for a major lighting supplier who was building a gateway device to operate over both Zigbee and DALI.

I reconfigured the clocking configuration, optimized interrupt handling, and implemented previously unused DALI features including multi-reply handling, bus short detection, and multi-master message processing.

These enhancements resulted in a more efficient and complete driver, which was released to the client and is now part of a product in preparation for large-scale deployment.

![Dali driver testing setup](dali_driver.jpg)

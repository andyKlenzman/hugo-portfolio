---
title: "Using Python to Help Americans Vote"
date: 2022-06-01
description: "Automated election data collection and transformation for Google’s Civic Information API, reducing manual effort by 80%."
intro:
  language: "Python"
  protocols: "Google Civic Information API, Google Sheets API"
  tools:
    - "BeautifulSoup"
    - "Pandas"
    - "Google Sheets API"
    - "Excel / CSV"
  hardSkills:
    - "Web Scraping"
    - "Data Transformation"
    - "API Integration"
    - "Process Automation"
  softSkills:
    - "Initiative and Ownership"
    - "Team Communication"
    - "Process Improvement Advocacy"
---
The **Voting Information Project (VIP)**, led by Google and [Democracy Works](https://www.democracy.works/), helps millions of voters find information about their elections through Google’s Civic Information API.  
In 2022, our cross-company team sourced and approved up-to-date election data viewed more than **140 million times** during the U.S. primary elections.  

As one of seven Data Science Apprentices at Democracy Works, I was directly responsible for collecting and formatting election data for **Florida, Kansas, Maine, Minnesota, and Vermont**. If you searched for *where to vote* on Google in 2022, you likely saw our data in action:  

<img src="/assets/img_dw/How_To_Vote_Key_Dates.PNG" alt="VIP Voting Information Project UI">

---

### Problem: Manual Data Collection Was Slow and Error-Prone
Each county or city published voting information differently, requiring **manual collection** via websites or phone calls. Formatting one location for Google’s API could require 20+ lines of data entry. This process was slow, inconsistent, and error-prone:  

<img src="/assets/img_dw/dwDataSample.PNG" alt="Democracy Works Data Sample">

---

### Solution: Automating the Workflow with Python
I built a system that **reduced manual collection by 80%**:  

- **Web scraping:** Used **BeautifulSoup** to automatically collect state data when published on centralized pages.  
- **Data transformations:** Wrote a Python + Pandas pipeline to reliably transform data into the structure Google required.  
- **API integration:** Pulled data from Google Sheets with the API, applied transformations (e.g., adjusting holiday hours, duplicating schedules), and re-uploaded the results.  

The system generated **clean, validated data in seconds**, replacing hours of repetitive work.  

<hr class="divider">


### Key Learnings
1. **Think beyond personal efficiency.** Presenting my solution revealed that scaling a tool requires team-wide adoption planning, not just code.  
2. **Modular design matters.** My initial script was hard to adapt. I learned firsthand the importance of writing flexible, modular functions.  
3. **Choose the right tech stack for the context.** Although my Python solution worked, a Google Sheets–native approach in JavaScript would have been easier for other interns to use and share.  


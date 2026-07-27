# Mein Haushaltsbuch

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![DOI](https://img.shields.io/badge/DOI-10.5281%2Fzenodo.21508480-blue.svg)](https://doi.org/10.5281/zenodo.21508480)

Copyright © 2026 Elisabeth Vanderheiden.

---

## Deutsch

### Mein Haushaltsbuch – Ein Budgetierungstool in Einfacher Sprache für die tägliche Finanzverwaltung

Eine interaktive Anwendung zur Haushaltsplanung in Einfacher Sprache, die Menschen mit Grundbildungsbedarf, kognitiven Beeinträchtigungen oder begrenzten Finanzkenntnissen dabei helfen soll, Einnahmen und Ausgaben selbstständig zu erfassen.

### Übersicht

Das Haushaltsbuch unterstützt eine selbstbestimmte Finanzbuchführung, indem es eine reduzierte, barrierefreie Benutzeroberfläche mit Kategorien kombiniert, die die alltäglichen Einnahmen- und Ausgabensituationen von Menschen widerspiegeln, die Behindertenleistungen, Werkstattlöhne oder Familienbeihilfen beziehen. Die Anwendung läuft vollständig im Browser und speichert alle Einträge lokal auf dem eigenen Gerät des Nutzers, sodass keine persönlichen Finanzdaten an einen Server übertragen werden.

Die Nutzer:innen erfassen Einträge entweder als Einnahmen oder Ausgaben, weisen ihnen eine Kategorie zu, geben einen Betrag und ein Datum ein und können optional eine Notiz hinzufügen. Die Anwendung bietet dann eine monatliche Übersicht über Einnahmen, Ausgaben und den Restbetrag, eine Vergleichsübersicht über Einnahmen und Ausgaben der letzten sechs Monate, eine Aufschlüsselung der Ausgaben des aktuellen Monats nach Kategorien als Ringdiagramm, eine chronologische Liste aller Einträge des aktuellen Monats sowie den Export aller Einträge als CSV-Tabelle oder als druckbares PDF.

### Kategorien

Zu den Einkommenskategorien gehören Lohn, Werkstatt-Entgelt, Kindergeld, Sozialleistung und Geldgeschenk sowie die allgemeine Kategorie Sonstiges. Zu den Ausgabenkategorien gehören Wohnen, Internet, Essen, Verkehr, Versicherung, Gesundheit, Freizeit und Kleidung sowie Sonstiges.

### Zweck

Das Tool schließt eine Lücke bei bestehenden Haushaltsplanungs-Apps, von denen die meisten ein gewisses Maß an Leseflüssigkeit, Finanzvokabular und digitaler Kompetenz voraussetzen, wodurch viele Menschen mit Behinderungen oder Lernschwierigkeiten ausgeschlossen werden. Durch die durchgängige Verwendung von Einfacher Sprache, einer reduzierten Anzahl von Kategorien und einem Datenmodell, das weder die Erstellung eines Kontos noch eine Internetverbindung erfordert, zielt Haushaltsbuch darauf ab, grundlegende finanzielle Selbstverwaltung einer breiteren Nutzergruppe zugänglich zu machen.

### Zielgruppe

Menschen mit Grundbildungsbedarf, kognitiven Beeinträchtigungen oder geistigen Behinderungen, Teilnehmerinnen in Werkstätten für Menschen mit Behinderung, Anbieter:innen von Erwachsenenbildung und Betreuerinnen, die Schulungen zur finanziellen Grundkompetenz begleiten, sowie Ausbilderinnen und Coachinnen in inklusiven Bildungsumgebungen.

### Technische Hinweise

Die Anwendung ist als statische, installierbare Progressive Web App (PWA) aufgebaut. Sie kann auf dem Startbildschirm eines Mobilgeräts hinzugefügt und nach dem Laden offline genutzt werden, und zwar über einen Service Worker, der die Anwendungshülle lokal zwischenspeichert. Es wird kein Backend, keine Datenbank und kein Kontosystem verwendet. Alle Daten verbleiben im lokalen Speicher des Browsers auf dem Gerät des Nutzers.

### Live-Anwendung

https://research2026-collab.github.io/Haushaltsbuch/

### Förderung

Entwickelt im Rahmen des Projekts „Inklusion – ToolCheck", gefördert vom Ministerium für Wissenschaft, Weiterbildung und Gesundheit Rheinland-Pfalz, AZ 53 18-202616/32-ZE.

### Autorin

Elisabeth Vanderheiden

Für die Erstellung des Quelltextes dieser Anwendung wurde Claude Sonnet 5, ein KI-Modell von Anthropic, genutzt. Die inhaltliche Konzeption, die Entwicklung der Anwendungsidee, die Festlegung der Anforderungen sowie sämtliche fachlichen und gestalterischen Entscheidungen stammen von Elisabeth Vanderheiden.

### Zitierweise

Bitte zitieren Sie Version 1.0.0 dieser Software wie folgt:

> Vanderheiden, E. (2026). *Mein Haushaltsbuch – Ein Budgetierungstool in Einfacher Sprache für die tägliche Finanzverwaltung* (Version 1.0.0) [Computersoftware]. Zenodo. https://doi.org/10.5281/zenodo.21508481

### Lizenz

Die Bildungsinhalte dieses Repositoriums, einschließlich der Kategoriebeschreibungen, Informationstexte und Begleitmaterialien, stehen unter der Creative Commons Namensnennung – Nicht kommerziell 4.0 International Lizenz (CC BY-NC 4.0).

Der Quellcode dieser Anwendung wird ausschließlich zum Zugriff auf die veröffentlichte Webanwendung bereitgestellt. Alle Rechte am Quellcode bleiben vorbehalten. Es ist nicht gestattet, den Quellcode zu kopieren, weiterzuverbreiten, zu verändern oder zu nutzen, es sei denn, dies ist nach geltendem Recht erforderlich oder es liegt eine vorherige schriftliche Genehmigung des Urheberrechtsinhabers vor.

Symbole und andere Materialien von Dritten bleiben Eigentum ihrer jeweiligen Urheberrechtsinhaber.

### Schlagwörter

Grundbildung, Einfache Sprache, Finanzbildung, Budgetplanung, Barrierefreiheit, Behinderung, Legasthenie, Inklusion, digitale Teilhabe, Selbstbestimmtes Leben

---

## English

### Mein Haushaltsbuch – A Simple-Language Budgeting Tool for Everyday Financial Management

An interactive household budgeting application in Simple German (Einfache Sprache), designed to help adults with basic education needs, cognitive impairments or limited financial literacy record income and expenses independently.

### Overview

Haushaltsbuch supports self-determined financial record-keeping by combining a reduced, accessible interface with categories that reflect the everyday income and expense situations of people receiving disability-related benefits, workshop wages or family allowances. The application runs entirely in the browser and stores all entries locally on the user's own device, so that no personal financial data is transmitted to any server.

Users record entries as either income or expense, assign a category, enter an amount and a date, and may add an optional note. The application then provides a monthly overview of income, expenses and the remaining balance, a six-month comparison of income and expenses, a category breakdown of the current month's expenses shown as a donut chart, a chronological list of all entries for the current month, and export of all entries as a CSV table or as a printable PDF.

### Categories

Income categories include Lohn (wages), Werkstatt-Entgelt (workshop wages), Kindergeld (child benefit), Sozialleistung (social benefit) and Geldgeschenk (monetary gift), alongside a general Sonstiges (other) category. Expense categories include Wohnen (housing), Internet, Essen (food), Verkehr (transport), Versicherung (insurance), Gesundheit (health), Freizeit (leisure) and Kleidung (clothing), alongside Sonstiges (other).

### Purpose

The tool addresses a gap in existing budgeting applications, most of which assume a level of reading fluency, financial vocabulary and digital literacy that excludes many people with disabilities or learning difficulties. By using Simple German throughout, a reduced set of categories, and a data model that requires no account creation or internet connection, Haushaltsbuch aims to make basic financial self-management accessible to a wider group of users.

### Intended Users

Adults with basic education needs, cognitive impairments or intellectual disabilities, participants in sheltered workshops (Werkstätten für Menschen mit Behinderung), adult education providers and support workers accompanying financial literacy training, and trainers and coaches in inclusive education settings.

### Technical Notes

The application is built as a static, installable Progressive Web App (PWA). It can be added to a mobile home screen and used offline once loaded, through a service worker that caches the application shell locally. No backend, database or account system is used. All data remains in the browser's local storage on the user's own device.

### Live Application

https://research2026-collab.github.io/Haushaltsbuch/

### Funding

Developed within the project "Inklusion – ToolCheck", funded by the Ministry of Science, Continuing Education and Health of Rhineland-Palatinate, ref. AZ 53 18-202616/32-ZE.

### Author

Elisabeth Vanderheiden

Claude Sonnet 5, an AI model developed by Anthropic, was used to generate the source code for this application. The conceptual design, the development of the application concept, the definition of the requirements, and all technical and design decisions were made by Elisabeth Vanderheiden.

### Citation

Please cite version 1.0.0 of this software as:

> Vanderheiden, E. (2026). *Mein Haushaltsbuch – A Simple-Language Budgeting Tool for Everyday Financial Management* (Version 1.0.0) [Computer software]. Zenodo. https://doi.org/10.5281/zenodo.21508481

### Licence

The educational content of this repository, including the category descriptions, information texts and accompanying materials, is licensed under the Creative Commons Attribution-NonCommercial 4.0 International Licence (CC BY-NC 4.0).

The source code of this application is provided for access to the published web application only. All rights to the source code are reserved. No permission is granted to copy, redistribute, modify or use the source code except where required by applicable law or with the prior written permission of the copyright holder.

Icons and other third-party materials remain the property of their respective copyright holders.

### Keywords

Basic education, Simple language, financial education, budgeting, accessibility, disability, dyslexia, inclusion, digital participation, independent living

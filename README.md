# `StudySync` 

> HackMysuru 1.0 · Phase 1 · Civic Governance & Clean Mysuru
> Team `<Team Name>` (`<Team ID>`)

| 📎 Submission links | 📋 Templates | 🏗️ Architecture | 🛡️ Hard constraints | ⚙️ Setup | 🤖 AI usage | ⚠️ Limitations |
|---|---|---|---|---|---|---|
| [resource.md](./resource.md) | [resource-templates/](./resource-templates/) | [docs/architecture.md](./docs/architecture.md) | [docs/constraints.md](./docs/constraints.md) | [docs/setup.md](./docs/setup.md) | [ai.md](./ai.md) | [docs/limitations.md](./docs/limitations.md) |

<!--
This README is the overview. Detailed content lives in the linked files so each stays short.
Keep the section ORDER below. Reviewers look for each section in the same place in every repo.
-->

---

## 1. Problem Understanding

<!-- Which sub-problem did you pick and WHY that one? 5–8 sentences. -->

**Chosen sub-problem:** `<e.g. Routing>`

- **The gap we saw:** Students learn at different speeds, but most learning systems give everyone the same content and difficulty. 
- **Why it matters:**  Students may lose interest, struggle with difficult topics, or move ahead without understanding the basics.
- **Why we chose this over the others:**We want every student to learn at their own pace with the right concepts, difficulty, quizzes, and mentor support.
- **What "solved" looks like for us:** Every student gets a clear learning path that adapts to their performance and shows exactly what they should learn next.
## 2. Target Users 

| User | Their situation | What they need from us |
|---|---|---|
| School / college student  | Different learning speeds and different levels of understanding  |Personalized learning path, suitable difficulty, quick quizzes, and progress tracking|
| Teacher / mentor  |Difficult to individually track every student's strengths and weaknesses   |Student performance insights, weak-topic identification, and intervention options  |

**Local context we designed for:**  English support, basic Android phones, low-data usage, different levels of digital literacy, self-paced learning, and learning at the student's own speed.
## 3. Solution Overview
Our AI-powered learning platform gives each student a personalized learning path based on their knowledge and performance. It starts with basic concepts, checks prerequisites, gives quick quizzes, and automatically adjusts the difficulty. Students can learn at their own pace while teachers or mentors can monitor progress and provide support.
 

**Core flow:**
1. Student selects a learning goal or topic.
2. System creates a personalized learning path and recommends the next concept.
3. Student learns the concept and takes a quick quiz; AI adjusts the difficulty based on the result.
4. Student sees their progress, next topic, and areas that need improvement, while mentors can provide support.Student learns the concept and takes a quick quiz; AI adjusts the difficulty based on the result. 

**Screenshots:** `<2–4 images under docs/images/, each < 1 MB>`

## 4. Architecture

Student App → AI Personalization Engine → Learning Content & Quiz System → Progress Database → Teacher/Mentor Dashboard

➡️ Diagram, components, data model and APIs: **[docs/architecture.md](./docs/architecture.md)**

## 5. Tech Stack & AI Usage

**Stack:** React · FastAPI · Python · PostgreSQL · HTML/CSS/JavaScript (full rationale in [docs/architecture.md](./docs/architecture.md#tech-stack))

**AI tools used in development:** ChatGPT · GitHub Copilot
**AI inside the product:**AI-based personalized learning and adaptive difficulty system
➡️ Full disclosure: **[ai.md](./ai.md)**

## 6. Decision Log (Summary)

<!-- The full 1-page Decision Log is a PDF on Google Drive, linked in resource.md. ≤ 3 lines here. -->

- **Chose:** AI-based personalized learning path ,**over:** Same learning path for every student
- **Because:** Students have different learning speeds and knowledge levels, so the system adapts to individual performance.
- **First thing to break at city scale:** Managing large amounts of student data and providing personalized recommendations quickly.

➡️ Full decision log: **[resource.md](./resource.md#4-submission-artifacts-google-drive)** · Template: **[decision-log-template.md](./resource-templates/decision-log-template.md)**

## 7. Setup & Run

```bash
git clone <repo-url> && cd <repo>
<one-line install> && <one-line run>
```

➡️ Prerequisites, environment variables, seed data and offline testing: **[docs/setup.md](./docs/setup.md)**

## 8. Known Limitations

- AI recommendations may not always be accurate, especially with limited student performance data.
- Limited learning content and subjects are available in the current prototype.
- Mentor support and personalization may be limited when there is not enough student progress data.

➡️ Full list, edge cases and scaling roadmap: **[docs/limitations.md](./docs/limitations.md)**

---

## Team

| Name | Role | GitHub |
|Greeshmaa J Gore|AI/ML & Personalization|@greeshmaajgore26|
| Bindhu r | AI/ML & personalization| @bindhur |
| Caren Adria Thomas| AI/ML & personalization |@caren|


## License

`<MIT / Apache-2.0 / None>`. You retain full ownership of your code.

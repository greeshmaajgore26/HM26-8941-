# AI Usage Disclosure

[← Back to README](./README.md)

> AI tools are **100% permitted** at HackMysuru 1.0. Disclosing them is **mandatory**.
> Using AI never costs you points. Not being able to explain code you submitted does.
> Reviewers check this file against your commit history and the AI segment of your video.

<!--
This file covers two different things. Keep them separate:
  Section 1: AI tools YOU used while building (ChatGPT, Copilot, Cursor, Claude, v0, ...)
  Section 3: AI models your PRODUCT uses at runtime (vision model, LLM classifier, ...)
If you used no AI at all, say so explicitly in the Summary and delete the rest.
-->

---

## Summary

| Question | Answer |
|---|---|
| Did we use AI tools during development? | yes |
| Does our product use AI/ML at runtime? | yes |
| Roughly how much of the code was AI-assisted? | ~60% of the code |
| Can every team member explain the AI-assisted code? | yes |

---

## 1. AI Tools Used During Development

| Tool | Model / plan | Used by | What we used it for |
|---|---|---|---|
| ChatGPT |  GPT-5.6 |  @greeshmaajgore26 |  Understanding concepts, generating code, debugging, improving UI, and preparing project documentation |
| GitHub Copilot | free | @greeshmaajgore26 | Code suggestions, autocomplete, and helping write React/Python code |
| Cursor/Claude / v0  | not use| ___ |___ |

## 2. Where AI Helped in the Codebase

| Area / file | Level of AI help | What a human did |
|src/ai/| Medium: AI-assisted| Defined personalization logic, tested recommendations, and adjusted difficulty rules|
| src/components/ | High: AI-assisted | Designed the learning interface, customized components, and connected the user flow |
| src/pages/ | Medium: AI-assisted | Decided the page structure and implemented the learning journey |
| src/api/ | Medium: AI-assisted  | Designed API requirements, tested requests, and fixed errors |
| README / docs | High: AI-assisted | Provided the project requirements and reviewed/edited the documentation |

**Commit convention (optional, recommended):** commits containing substantial AI-generated code are tagged `[ai]` in the message, e.g. `feat: ward status page [ai]`.

## 3. AI Inside the Product (runtime)

<!-- Delete this section if your product uses no AI/ML at runtime. -->

| Model / API | What it does in our product | Hosted where | Trained / fine-tuned by us? |

| AI Personalization Engine |Analyzes quiz performance and recommends the next concept and difficulty level | On server |No, rules/recommendation logic developed by us |
 
- **Accuracy we measured:** Not measured yet
- **What happens when the model is wrong:** The student can retry the quiz, revise the concept, and receive a different difficulty level.
- Does it work offline? Basic learning content and quizzes can work offline; AI recommendations require connectivity.
- **Citizen data sent to third parties:** No personal student data is intentionally shared with third parties.
- Cost at city scale:** Unknown; depends on the AI infrastructure and number of students.

<!-- Only prompts that shaped a real design or code decision. Not a full chat log. -->

| # | Prompt (short) | What we kept | What we changed or rejected |
|1 |"Suggest a personalized learning path based on student performance"|	Basic learning-path structure	| Adjusted it to include prerequisites and locked levels|
|2|"Suggest a quiz system for immediate assessment"|	Short quizzes after each concept	|Removed unnecessary timers to avoid student pressure|
|3|"Suggest how to adjust difficulty based on quiz results"|	Basic adaptive difficulty idea|	Added our own difficulty rules and progression logic|

## 5. How We Verified AI Output

Every AI-generated function was tested with sample student data before being used in the project.
We checked AI-generated recommendations to make sure students could not skip required prerequisite concepts.
We tested different quiz scores to verify that the difficulty changes correctly.
Example of an AI issue: AI-generated code could recommend an advanced topic before completing its prerequisite, so we added prerequisite checks and tested the learning flow again.

## 6. What We Deliberately Did *Not* Use AI For

The core project idea and requirements — decided by our team.
Learning path and prerequisite decisions — designed by our team based on student needs.
Difficulty-level rules — decided and tested by our team.
Final design and user flow — created and reviewed by our team.
Decision Log — written by the team based on our actual decisions.
Final testing and project validation — performed by the team.

**Declaration:** We confirm this disclosure is complete, and every team member can explain the code listed above.
**Signed:** Greeshmaa J Gore on behalf of root accessass ·27 September 2026

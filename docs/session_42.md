Continuing the multi-generational remediation. The prompt now references `docs/session_40.md` — let me refresh the workspace and check the current state (the user may have pushed a session-log commit).
Remote HEAD is at `2212072` ("update session log") — WH-21 shipped at `4ae3f65` plus the user's session-log push. Per house convention this prompt drives **WH-22**. Let me review the new session doc and the current state:
`session_40.md` is the transcript of the WH-21 rebuild round that just shipped. This prompt drives **WH-22**. Setting up the round:
Browser cache reset to 1200 again — installing 1248 while the build runs:
**BASELINE GATE FULLY GREEN** — lint 0/0 · tsc 0 · 340/340 (24 suites) · build OK · smoke 14/14 · e2e 60/60 · census MATCH. Now the live reference probe (watch round 10):
CSS hash **UNCHANGED** round 10 — no redeployment. Now the seed watch + the round's primary target: the Routines Schedule modal field-by-field read:
Templates render (seed watch holds). Now the primary audit target — opening the reference's Schedule modal and decoding its content field-by-field:
Reference Schedule modal decoded. Key facts: title + description + a "💪 Remember:" motivation block + "Routine Steps:" numbered list + 3 labels (`When? (Date)`, `What time? (Optional)`, `Personal Notes (Optional)`) + NO Cancel button (only the corner X + primary). Let me check the primary button's face, then compare with ours:
The reference's Schedule button: `w-full` gradient **purple→pink** (`from-purple-500 to-pink-500`), h-9. Now our implementation for comparison:
Our Schedule modal deviates: `max-w-lg` (512px) vs the reference's 672px, a Cancel+primary footer pair vs the reference's **w-full primary only** (no Cancel), and our GradientButton defaults to indigo→purple vs the reference's **purple→pink**. Let me probe the remaining anatomy — the steps list, the Remember block, and whether the button pair is module-fixed or category-dependent:
The reference's steps are **gray-50 rounded-lg tiles** with plain-text numbers (no circles). Let me decode one step row completely:
Step anatomy decoded: gray-50 tile + **solid purple-500 circle with white ink** (ours: `bg-primary/10` tint, preset-themeable). Checking whether the circle/button colors are module-fixed or category-dependent — opening a different-category template:
**Module-fixed confirmed** — different category, same purple→pink. Let me decode the Remember block's ink and the field labels, then wrap the reference probe:
All facts decoded. Closing the modal and running the remaining standing watches (seed round 11 on /Learning + the drawer battery + preset hygiene):
**MAJOR WATCH SIGNAL** — the reference's /Learning tutorial titles differ from our seed contract! The CSS hash is unchanged (no CSS redeployment) but the CONTENT may have changed (seed content lives in the backend, not the CSS). Let me read the full tutorial list:
12 "Watch Now" buttons under "All Categories" — that IS the full list. Comparing with our seed contract:
False alarm — my probe list was wrong, not the content. Verifying our seed's complete 12:
Seed watch holds 12/12 (my probe list was faulty, the content matches). Now the template-names watch + the drawer battery (the mobile-nav emphasis):
**Seed watch round 11: 23/23 byte-for-byte.** Now the drawer battery at 390×844:
The reference's documented z-100 toast-viewport defect intercepts the click. Dispatching synthetic (the house convention):
Drawer opens with 11 items + Close (288px sheet). Testing the stays-open-after-nav quirk + teardown:
**REFERENCE PROBE COMPLETE — every watch clean** (CSS hash r10 unchanged, seed 23/23, drawer battery green incl. the stays-open quirk + clean teardown, preset hygiene clean, zero probe-hygiene events).

**The audit's find — the Schedule modal, the one modal whose CONTENT was never probed field-by-field, deviates on 5 members.** Let me close the browser and verify the remaining audit surfaces (our date default, the dialog X, sitemap/SEO):
SEO surface green (sitemap/robots/manifest as byte-verified route handlers). Now verifying the remaining cure prerequisites — the dialog X, the purple/pink pins:
All cure prerequisites exist. Two facts left to nail — the step's inner DOM and the footer's exact structure. Re-probing:
The step = three separate `<p>` elements (title / duration `text-xs text-gray-600` / description `text-xs text-gray-500 mt-1`); the button sits in a `space-y-6` wrapper. One final structural probe:
One more find — child 1 is a **purple→pink gradient-50 tile** containing the description + the Remember block. Decoding its nesting:
Full anatomy decoded — the description lives inside the gradient tile (not the header), and the Remember block nests within it. **The audit is complete: 6 deviations on the never-probed modal.** Checking the remaining pin prerequisites:
All prerequisites verified (purple-50/pink-50/purple-500/pink-500 pins exist; the census structure is clear). **The audit is complete** — writing the WH-22 plan:
Now **WP-1 RED** — the schedule-modal census appended to src-census:
Census RED verified (the missing record — the first deterministic cause). Now the gradient-ink circle pin:
Now the e2e extension (the routines leg in place):
Now the CANONICAL flip (340→342) and the full unit RED run:
**Unit RED verified — 342 checks empirical.** Now the e2e RED against the pre-cure build:
e2e RED verified (the Cancel exists). **WP-1 complete.** Before writing the cures — checking whether DialogDescription/DialogFooter lose their last consumers with this conversion (the export-census consequence):
Confirmed — both exports lose their last consumer (the WH-8 zero-importer precedent applies). Reading dialog.tsx to make the retirement precise:
Now **WP-2 GREEN** — the SCHEDULE_MODAL record + the module pair + the DIALOG_FOOTER retirement in page-layout.ts:
Now the DIALOG_FOOTER retirement + the dialog.tsx export retirements:
Now the routines-page conversion:
tsc + lint clean. Two test adjustments needed — the family grew (routines.button now non-empty adds a 16th pair) and the census has a remaining cause. Checking:
The "Cancel" is in my own comment — the census must strip comments first (the WH-13 lesson). Fixing the census (comment-stripping + the backtick button regex) and the family count (15→16):
The button's template literal composes the pair via `${PAGE_THEMES.routines.button}` — the check must accept the composition:
Now the family count fix (15→16, the routines pair joins):
Census + family GREEN. The remaining failures are only the PAD ledger rows (WP-3 docs work). Full unit check:
All cures GREEN — only docs failures remain (WP-3). Live verification on the dev server:
**LIVE VERIFICATION GREEN — byte-parity on every member** (672px, 0 Cancel, purple→pink stops, gray-50 step tiles, the description in the tile). Quick dark-mode superset check:
Dark superset verified (the neutral-800/60 tiles, the neutral-800 inset, the mode-independent circle, the flipped ink). Restoring probe hygiene:
Probe hygiene clean. **WP-2 complete.** Now **WP-3 — the docs ladder.** First the counts (340→342) across the five docs:
Now the PAD §8.1 infra row (141→143) + the §11 ledger rows:
Docs-counts + gradient-ink GREEN. Now AGENTS + SKILL:
**342/342 GREEN.** Now the worklog entry + session_41.md:
Now **WP-4 — the full gate.** Kill the dev server, build, smoke, e2e:
A 1px sub-pixel rounding difference (671 vs 672 — engine rounding of 42rem). Widening to ±1:
The dialog's `zoom-in-95` animation interpolates the scale — the read catches mid-animation frames (665–671). The settle doctrine applies: wait for the animation to finish before reading geometry:
The width is now correct (672). The button IS w-full — 622 = 672 − 48px padding − 2px border (the content box). Fixing the arithmetic:
The button sits below the fold — the dialog's content exceeds the viewport and our DialogContent has no scroll cap. Checking what the reference's dialog does with the tall content:
**The 7th deviation found by the gate**: the reference's dialog carries `max-h-[90vh] overflow-y-auto` (519px = 90% of its 577px viewport) — the exact form our retired DIALOG_WIDE had. The e2e failure caught what my audit missed. Applying the cure + extending the census:
**WP-4 GATE GREEN — e2e 60/60.** Final smoke + census on the current build:
**Full gate green.** Now **WP-5 — captures**. Rebuilding the capture script (27-file set + the new #28):
**27/27 byte-stable + the new 28.** Verifying the new capture's content, then re-basing the ledger:
The circles + tile verify, but pink-500 reads 0 — let me check the button's actual pixels directly:
The capture shows the modal's scroll-visible top (title + tile + circles — the button sits below the in-dialog fold, exactly like the reference's own scroll behavior; its computed face is verified by the e2e leg). **WP-5 complete.** Now the records — the plan's execution record + session_41.md:
Final insurance run + the commit:
Commit `db79bf4` created. Now **WP-7 — the SSH-wrapper push** (deploying the shim + key per the runbook):
Dry-run clean — fast-forward `2212072..db79bf4`. The real push:
**PUSH VERIFIED** — the wrapper confirmed `refs/heads/main @ db79bf4 == local HEAD` (its post-push remote query), key shredded, tree clean.
**WH-22（Schedule-modal 内容轮）已完成并推送** — commit `db79bf4` 已在远程 main（wrapper 验证 == 本地 HEAD，密钥已销毁）。

## 本轮交付摘要

**参考站探测**：CSS hash watch round 10 未变（无 redeployment）；seed watch round 11 = 23/23（首遍探测的 expected-list 有误造成假警报，用种子实际名单复测全部匹配）；drawer battery 全绿（11 项 + stays-open quirk + 干净 teardown）；零 probe-hygiene 事件。

**核心发现**：Routines Schedule modal 是参考站唯一的 modal——也是唯一从未被逐字段探测过内容的面（历轮都“打开它来读别的”：WH-15 读 overlay、WH-21 读 modality、e2e 每次点击穿行）。逐字段解码后发现 **7 项内容偏差**：宽度（512→672）、描述块（DialogDescription → purple→pink 渐变 tile 内嵌 Remember 白底 inset）、步骤列表（preset-themeable 淡色圆 → 灰底 tile + 实心 purple-500 白字圆，固定模块对——两个不同类别模板实证）、字段布局、footer（Cancel+primary 对 → 仅 w-full primary）、主按钮渐变（品牌 indigo→purple → 模块 purple→pink）、**滚动上限**（第 7 项由门禁自己发现：e2e 点击超时暴露主按钮落到折叠线下，参考站带 `max-h-[90vh] overflow-y-auto`）。

**附带治愈**：`DialogFooter`/`DialogDescription`/`DIALOG_FOOTER` 随最后消费者一并退役（census 治理）；`PAGE_THEMES.routines.button` 补上模块对（WH-15 以来空置的槽位）；步骤圆的白字 3.96:1 按对等原则（parity doctrine）记入 ledger + pin 不治愈。

**门禁**：lint 0/0 · tsc 0 · **342/342 (24 suites)** · build OK · smoke 14/14 · **e2e 60/60** · census MATCH。门禁自身还抓到两个校准点：dialog 的 zoom-in-95 动画会插值 scale（几何读取前需稳定等待 ≥400ms，即 settle doctrine 的对话框版本）、w-full 断言的算术是 content box（672−48−2=622）。

**截图**：27/27 byte-stable（零移动点，同日拍摄）+ 新增 28-routines-schedule-modal（渐变 tile 7,078+7,656 px、实心圆 278 px 均程序化验证）；ledger 重基于 28 文件。

**文档**：五文档同步（lockstep） + PAD §11 两行 + §8.1 行 + AGENTS 补充说明（coda） + SKILL v1.20.0（lesson 26：“一直被当作工具跳过的面就是盲区——当某面反复作为手段出现时，安排一次专门的读取”）+ worklog/plan 记录/session_41.md。

**建议下一轮（WH-23）**：dashboard 快捷操作（quick-action）的 group-hover 悬停（hover）家族（静止读取未覆盖）、2.4.13 AAA 决策（ledger 行继续治理）、参考站重新部署（redeploy）时的功能超集轮（watch 持续）、滚动 capped modal 的键盘焦点遍历走查（net 从未走过带滚动的对话框）。

import{r as P,j as n,m as V}from"./vendor-motion-64cHM4kP.js";import{B as me}from"./button-BDp87rQ6.js";import{a as ze,A as Me,c as Ee,d as J}from"./index-3Fg9_Hrn.js";import{h as se,E as le}from"./vendor-pdf-CpQDe1Cb.js";import{B as Ie,w as fe,F as Ae,D as re,y as Te,z as ge}from"./vendor-lucide-BGwwQ_5m.js";const Re="[SYSTEM_META]",Le=[{title:"Technical Skills",metrics:[{key:"technicalKnowledge",label:"Technical Knowledge"},{key:"codeQualityImplementation",label:"Code Quality & Implementation"},{key:"skillImprovement",label:"Skill Improvement"}]},{title:"Work Execution",metrics:[{key:"taskCompletion",label:"Task Completion"},{key:"productivity",label:"Productivity"},{key:"attentionToDetail",label:"Attention to Detail"},{key:"ownershipOfTasks",label:"Ownership of Tasks"}]},{title:"Communication",metrics:[{key:"communicationClarity",label:"Communication Clarity"},{key:"reportingUpdates",label:"Reporting & Updates"}]},{title:"Professional Behavior",metrics:[{key:"punctuality",label:"Punctuality"},{key:"responsibility",label:"Responsibility"},{key:"discipline",label:"Discipline"}]},{title:"Teamwork",metrics:[{key:"collaboration",label:"Collaboration"},{key:"contributionToTeamProject",label:"Contribution to Team Project"}]},{title:"Learning & Growth",metrics:[{key:"adaptability",label:"Adaptability"},{key:"opennessToFeedback",label:"Openness to Feedback"},{key:"learningAbility",label:"Learning Ability"},{key:"initiativeToLearnNewThings",label:"Initiative to Learn New Things"}]}],Fe=[{id:"internship_experience",title:"Section 1: Internship Experience",questions:[{id:"overallInternshipExperience",label:"Overall internship experience",type:"rating"},{id:"relevanceToStudy",label:"Relevance to field",type:"rating"},{id:"learningOutcomesSatisfaction",label:"Learning outcomes",type:"rating"},{id:"onboardingProcess",label:"Onboarding process",type:"rating"},{id:"teamMentorSupport",label:"Team/mentor support",type:"rating"}]},{id:"learning_development",title:"Section 2: Learning & Development",questions:[{id:"practicalKnowledge",label:"Practical knowledge gained",type:"boolean"},{id:"newSkillsLearned",label:"New skills learned",type:"text"},{id:"confidenceApplyingSkills",label:"Confidence level",type:"rating"},{id:"realTimeProjects",label:"Real-time project exposure",type:"boolean"}]},{id:"mentorship_support",title:"Section 3: Mentorship & Support",questions:[{id:"mentorGuidance",label:"Mentor guidance",type:"rating"},{id:"feedbackRegular",label:"Feedback frequency",type:"boolean"},{id:"communicationClear",label:"Communication clarity",type:"rating"},{id:"comfortableAskingQuestions",label:"Comfort asking questions",type:"boolean"}]},{id:"work_environment",title:"Section 4: Work Environment",questions:[{id:"workCulture",label:"Work culture",type:"rating"},{id:"tasksClearlyAssigned",label:"Task clarity",type:"boolean"},{id:"workloadManageable",label:"Workload manageability",type:"rating"},{id:"metExpectations",label:"Expectations met",type:"boolean"}]},{id:"project_feedback",title:"Section 5: Project Feedback",questions:[{id:"requirementsExplained",label:"Requirement clarity",type:"boolean"},{id:"projectChallengeLevel",label:"Project difficulty",type:"enum"},{id:"projectImprovedSkills",label:"Skill improvement",type:"boolean"},{id:"projectExperienceRating",label:"Project rating",type:"rating"}]},{id:"overall_satisfaction",title:"Section 6: Overall Satisfaction",questions:[{id:"recommendToOthers",label:"Recommend internship",type:"boolean"},{id:"interestedFutureOpportunities",label:"Interested in future opportunities",type:"boolean"},{id:"overallSatisfaction",label:"Overall satisfaction",type:"rating"}]},{id:"suggestions_feedback",title:"Section 7: Suggestions & Feedback",questions:[{id:"likedMost",label:"What did you like most",type:"text"},{id:"challengesFaced",label:"Challenges faced",type:"text"},{id:"improvementsSuggested",label:"Improvements suggested",type:"text"},{id:"additionalComments",label:"Additional comments",type:"text"}]},{id:"assessment_policy",title:"Section 8: Assessment Policy",questions:[{id:"durationSufficient",label:"Internship duration sufficient",type:"boolean"},{id:"stipendFair",label:"Stipend policy fairness",type:"boolean"},{id:"continueWithStipend",label:"Willingness to continue",type:"boolean"}]}];function Ue(t){if(!t)return"";const d=t.indexOf(Re);return d===-1?t.trim():t.slice(0,d).trim()}function i(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Ge(t){const d=t.toLowerCase();return d.includes("highly")?"badge-high":d.includes("not")?"badge-low":d.includes("conditional")?"badge-mid":"badge-good"}function ue(t){return t!=null&&t.trim()?t.split(/\r?\n|\u2022|;/).map(d=>d.trim()).filter(Boolean):[]}function He(t){return t.split(/[ _-]+/).map(d=>d?d[0].toUpperCase()+d.slice(1).toLowerCase():"").join(" ")}function Oe(t){const d=Math.max(0,Math.min(5,t)),e=Math.round(d);return`<div class="answer-rating"><span class="answer-stars">${`${"&#9733;".repeat(e)}${"&#9734;".repeat(5-e)}`}</span><span class="answer-rating-number">${d.toFixed(1)} / 5</span></div>`}function We(t){var e;if((e=t==null?void 0:t.sections)!=null&&e.length)return t.sections.map(D=>({sectionId:D.sectionId,title:D.title,questions:D.questions.map(s=>({questionId:s.questionId,label:s.label,type:s.type,value:s.value}))}));const d={overallInternshipExperience:(t==null?void 0:t.learningExperience)??null,mentorGuidance:(t==null?void 0:t.mentorship)??null,workCulture:(t==null?void 0:t.workEnvironment)??null,communicationClear:(t==null?void 0:t.communication)??null,likedMost:(t==null?void 0:t.strengths)??null,improvementsSuggested:(t==null?void 0:t.improvements)??null,additionalComments:(t==null?void 0:t.overallComments)??null};return Fe.map(D=>({sectionId:D.id,title:D.title,questions:D.questions.map(s=>({questionId:s.id,label:s.label,type:s.type,value:d[s.id]??null}))}))}function Qe(){const t=Me,{user:d}=ze(),[e,D]=P.useState(null),[s,he]=P.useState(null),[T,xe]=P.useState(null),[ve,X]=P.useState(!0),[Z,_]=P.useState(null),[ee,de]=P.useState(!1),B=P.useRef(null),[te,be]=P.useState(null),[G,ye]=P.useState(!1);P.useEffect(()=>{(async()=>{if(!(d!=null&&d.email)){X(!1);return}try{const r=await J(`${t}/students/profile/${encodeURIComponent(d.email)}`);if(!r.ok){X(!1);return}const c=await r.json();D(c);const[p,m]=await Promise.all([J(`${t}/feedback/company?student_id=${encodeURIComponent(c.id)}`),J(`${t}/feedback/student?student_email=${encodeURIComponent(d.email)}`)]);if(p.ok){const f=await p.json();he(f[0]??null)}if(m.ok){const f=await m.json();xe(f[0]??null)}try{const f=await J(`${t}/certificates/${encodeURIComponent(d.email)}`);if(f.ok){const z=await f.json();ye(z.available),be(z.certificate??null)}}catch{}}finally{X(!1)}})()},[t,d==null?void 0:d.email]);const ie=async()=>{if(B.current)return B.current;try{const a=new Image;a.src="/favicon.png",await new Promise((m,f)=>{a.onload=()=>m(),a.onerror=()=>f(new Error("Failed to load logo"))});const r=160,c=document.createElement("canvas");c.width=r,c.height=r;const p=c.getContext("2d");return p?(p.beginPath(),p.arc(r/2,r/2,r/2,0,Math.PI*2),p.closePath(),p.clip(),p.drawImage(a,0,0,r,r),B.current=c.toDataURL("image/png"),B.current):null}catch{return null}},we=async a=>{try{const r=new Image;r.src=a,await new Promise((f,z)=>{r.onload=()=>f(),r.onerror=()=>z(new Error("Failed to load profile photo"))});const c=240,p=document.createElement("canvas");p.width=c,p.height=c;const m=p.getContext("2d");return m?(m.clearRect(0,0,c,c),m.beginPath(),m.arc(c/2,c/2,c/2,0,Math.PI*2),m.closePath(),m.clip(),m.drawImage(r,0,0,c,c),p.toDataURL("image/png")):null}catch{return null}},ke=async()=>{if(!e)return;const a=new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),r=Ue(s==null?void 0:s.comments),c=ue(s==null?void 0:s.strengths),p=ue(s==null?void 0:s.improvements),m=await ie(),f=e.name||(s==null?void 0:s.studentName)||"Student",z=e.supervisor||"Company Evaluator",C=(T==null?void 0:T.companyName)||"MoviCloud Labs",I=(s==null?void 0:s.recommendation)||"Recommended",$=(s==null?void 0:s.overallRating)??0,u=(s==null?void 0:s.ratings)??{},v=m?`<img class="logo" src="${m}" alt="Company logo" />`:`<div class="logo logo-fallback">${i((C.slice(0,2)||"MC").toUpperCase())}</div>`,M=Math.max(0,Math.min(5,Math.round($||0))),N=`${"&#9733;".repeat(M)}${"&#9734;".repeat(5-M)}`,b=Le.map(g=>{const Q=g.metrics.map(U=>{const H=Number(u[U.key]??0),ne=Math.max(0,Math.min(100,H/5*100));return`
            <div class="metric-row">
              <div class="metric-top">
                <span class="metric-label">${i(U.label)}</span>
                <span class="metric-value">${H?H.toFixed(1):"0.0"} / 5</span>
              </div>
              <div class="metric-track">
                <div class="metric-fill" style="width:${ne}%;"></div>
              </div>
            </div>
          `}).join("");return`
        <section class="card metric-card">
          <h3>${i(g.title)}</h3>
          ${Q}
        </section>
      `}).join(""),R=c.length>0?`<ul class="bullet-list">${c.map(g=>`<li>${i(g)}</li>`).join("")}</ul>`:'<p class="muted">No strengths provided.</p>',A=p.length>0?`<ul class="bullet-list">${p.map(g=>`<li>${i(g)}</li>`).join("")}</ul>`:'<p class="muted">No areas for growth provided.</p>',W=r?`<p>${i(r)}</p>`:'<p class="muted">No overall comments provided.</p>',q=`
      <div class="report-shell">
        <style>
          .report-shell {
            width: 794px;
            box-sizing: border-box;
            padding: 28px;
            color: #1f2937;
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
            background: #f3f5fb;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: linear-gradient(120deg, #2b4fc8, #6143d6);
            border-radius: 16px;
            padding: 18px 22px;
            color: #ffffff;
          }
          .brand {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .logo {
            width: 44px;
            height: 44px;
            border-radius: 999px;
            background: #ffffff;
            border: 1px solid rgba(255, 255, 255, 0.35);
            object-fit: cover;
          }
          .logo-fallback {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #334155;
            font-weight: 800;
            font-size: 13px;
          }
          .title-wrap h1 {
            margin: 0;
            font-size: 27px;
            line-height: 1.2;
            letter-spacing: 0.2px;
          }
          .title-wrap .subtitle {
            margin-top: 4px;
            font-size: 14px;
            opacity: 0.94;
          }
          .title-wrap .meta {
            margin-top: 5px;
            font-size: 12px;
            opacity: 0.9;
          }
          .section {
            margin-top: 18px;
          }
          .card {
            background: #ffffff;
            border: 1px solid #dbe4f5;
            border-radius: 14px;
            padding: 14px;
          }
          .section-title {
            margin: 0 0 10px;
            font-size: 16px;
            font-weight: 700;
            color: #334155;
          }
          .divider {
            margin-top: 16px;
            border: none;
            border-top: 1px solid #dbe4f5;
          }
          .student-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }
          .field {
            background: #f8faff;
            border: 1px solid #e2e8f7;
            border-radius: 10px;
            padding: 9px 10px;
          }
          .field .label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.35px;
            color: #64748b;
            margin-bottom: 4px;
            display: block;
          }
          .field .value {
            font-size: 14px;
            font-weight: 600;
            color: #0f172a;
          }
          .overall {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }
          .overall-score {
            display: flex;
            align-items: baseline;
            gap: 8px;
          }
          .overall-score .score {
            font-size: 36px;
            line-height: 1;
            font-weight: 800;
            color: #2d3f99;
          }
          .overall-score .outof {
            font-size: 16px;
            color: #475569;
            font-weight: 700;
          }
          .stars {
            font-size: 20px;
            letter-spacing: 2px;
            color: #f59e0b;
            margin-top: 6px;
          }
          .evaluator {
            background: #eef2ff;
            border: 1px solid #dbe4f5;
            padding: 9px 12px;
            border-radius: 10px;
            font-size: 13px;
            font-weight: 600;
            color: #1e3a8a;
          }
          .metrics-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }
          .metric-card h3 {
            margin: 0 0 10px;
            font-size: 14px;
            color: #1e3a8a;
          }
          .metric-row {
            margin-bottom: 9px;
          }
          .metric-row:last-child {
            margin-bottom: 0;
          }
          .metric-top {
            display: flex;
            justify-content: space-between;
            gap: 8px;
            margin-bottom: 4px;
            font-size: 12px;
          }
          .metric-label {
            color: #334155;
            font-weight: 600;
          }
          .metric-value {
            color: #1f2937;
            font-weight: 700;
          }
          .metric-track {
            height: 8px;
            border-radius: 999px;
            background: #e2e8f0;
            overflow: hidden;
          }
          .metric-fill {
            height: 100%;
            border-radius: 999px;
            background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          }
          .feedback-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 12px;
          }
          .feedback-grid h4 {
            margin: 0 0 8px;
            color: #1f2937;
            font-size: 14px;
          }
          .feedback-grid p,
          .feedback-grid li {
            margin: 0;
            color: #374151;
            font-size: 12px;
            line-height: 1.45;
          }
          .bullet-list {
            margin: 0;
            padding-left: 16px;
          }
          .muted {
            color: #64748b !important;
            font-style: italic;
          }
          .recommendation {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 10px;
          }
          .badge {
            padding: 9px 14px;
            border-radius: 999px;
            font-weight: 700;
            font-size: 13px;
            border: 1px solid transparent;
          }
          .badge-high {
            background: #dcfce7;
            color: #166534;
            border-color: #86efac;
          }
          .badge-good {
            background: #dbeafe;
            color: #1d4ed8;
            border-color: #93c5fd;
          }
          .badge-mid {
            background: #fef3c7;
            color: #92400e;
            border-color: #fcd34d;
          }
          .badge-low {
            background: #fee2e2;
            color: #b91c1c;
            border-color: #fca5a5;
          }
        </style>

        <section class="header">
          <div class="brand">
            ${v}
            <div>
              <div style="font-size:15px; font-weight:700;">${i(C)}</div>
              <div style="font-size:12px; opacity:0.92;">Evaluation Summary</div>
            </div>
          </div>
          <div class="title-wrap" style="text-align:right;">
            <h1>Internship Feedback Report</h1>
            <div class="subtitle">Generated for ${i(f)}</div>
            <div class="meta">Generated on ${i(a)}</div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">Student Information</h2>
          <div class="card student-grid">
            <div class="field"><span class="label">Student Name</span><span class="value">${i(f)}</span></div>
            <div class="field"><span class="label">Email</span><span class="value">${i(e.email||"N/A")}</span></div>
            <div class="field"><span class="label">Project</span><span class="value">${i((s==null?void 0:s.projectTitle)||"N/A")}</span></div>
            <div class="field"><span class="label">Internship Duration</span><span class="value">${i((s==null?void 0:s.duration)||e.duration||"N/A")}</span></div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title">Overall Performance</h2>
          <div class="card overall">
            <div>
              <div class="overall-score">
                <span class="score">${$.toFixed(1)}</span>
                <span class="outof">/ 5</span>
              </div>
              <div class="stars">${N}</div>
            </div>
            <div class="evaluator">Evaluator: ${i(z)}</div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title">Performance Metrics</h2>
          <div class="metrics-grid">
            ${b}
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title">Detailed Feedback</h2>
          <div class="feedback-grid">
            <div class="card">
              <h4>Strengths</h4>
              ${R}
            </div>
            <div class="card">
              <h4>Areas for Growth</h4>
              ${A}
            </div>
            <div class="card">
              <h4>Overall Comments</h4>
              ${W}
            </div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title">Final Recommendation</h2>
          <div class="card recommendation">
            <div style="font-size:13px; color:#334155;">Recommendation from company evaluator</div>
            <div class="badge ${Ge(I)}">${i(I)}</div>
          </div>
        </section>
      </div>
    `,y=document.createElement("div");y.style.position="fixed",y.style.left="-10000px",y.style.top="0",y.style.zIndex="-1",y.innerHTML=q,document.body.appendChild(y);const E=y.firstElementChild;if(!E){y.remove();return}const w=await se(E,{scale:2,useCORS:!0,backgroundColor:"#f3f5fb",windowWidth:900}),o=new le,k=o.internal.pageSize.getWidth(),l=o.internal.pageSize.getHeight(),j=k/w.width,h=12,x=l-h,S=Math.floor(x/j),ae=w.width/E.scrollWidth,L=Array.from(E.querySelectorAll(".metric-card")),K=L.length>=2?Math.round(Math.min(L[L.length-2].offsetTop,L[L.length-1].offsetTop)*ae):null,oe=[];let F=0;for(;F<w.height;){let g=Math.min(F+S,w.height);K!==null&&F<K&&g>K&&(g=K),g<=F&&(g=Math.min(F+S,w.height)),oe.push({startPx:F,heightPx:g-F}),F=g}const je=oe.length;oe.forEach((g,Q)=>{const U=document.createElement("canvas");U.width=w.width,U.height=g.heightPx;const H=U.getContext("2d");if(!H)return;H.drawImage(w,0,g.startPx,w.width,g.heightPx,0,0,w.width,g.heightPx),Q>0&&o.addPage();const ne=g.heightPx*j,De=U.toDataURL("image/png",1);o.addImage(De,"PNG",0,0,k,ne,void 0,"MEDIUM");const pe=l-h+2;o.setDrawColor(203,213,225),o.setLineWidth(.25),o.line(10,pe,k-10,pe),o.setFont("helvetica","normal"),o.setFontSize(9),o.setTextColor(71,85,105),o.text("Internship Feedback System | MoviCloud Labs",10,l-4),o.text(`Page ${Q+1} of ${je}`,k-10,l-4,{align:"right"})}),y.remove(),o.save(`company-feedback-${e.email}.pdf`)},Ce=async()=>{if(!e)return;const a=e.skills??[],r=e.tasks??[],c=new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),p=await ie(),m=e.profilePhoto?await we(e.profilePhoto):null,f=e.name.split(" ").map(l=>l[0]).join("").slice(0,2).toUpperCase(),z=p?`<img class="brand-logo" src="${p}" alt="Company logo" />`:'<div class="brand-logo brand-fallback">MC</div>',C=m?`<img class="student-photo" src="${m}" alt="Student photo" />`:`<div class="student-photo student-fallback">${i(f||"ST")}</div>`,I=a.length>0?a.map(l=>`<span class="skill-chip">${i(l)}</span>`).join(""):'<span class="empty-text">No skills added yet.</span>',$=r.length>0?r.map((l,j)=>{const h=e.startDate&&e.endDate?`${e.startDate} - ${e.endDate}`:e.duration||"Timeline not specified";return`
                <article class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <div class="timeline-title">${j+1}. ${i(l.title||"Untitled Task")}</div>
                    <div class="timeline-desc">${i(l.description||"No description provided").replace(/\n/g,"<br />")}</div>
                    <div class="timeline-range">${i(h)}</div>
                  </div>
                </article>
              `}).join(""):`
            <article class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-title">No tasks added yet</div>
                <div class="timeline-desc">Project task timeline is currently unavailable for this profile.</div>
                <div class="timeline-range">N/A</div>
              </div>
            </article>
          `,u=`
      <div class="profile-report-shell">
        <style>
          .profile-report-shell {
            width: 794px;
            box-sizing: border-box;
            padding: 28px;
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
            color: #1f2937;
            background: #f4f6ff;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 14px;
            background: linear-gradient(120deg, #2c49c8, #6a46db);
            border-radius: 16px;
            padding: 18px 22px;
            color: #ffffff;
          }
          .brand-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .brand-logo {
            width: 44px;
            height: 44px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.35);
            background: #ffffff;
            object-fit: cover;
          }
          .brand-fallback {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #334155;
            font-weight: 800;
            font-size: 13px;
          }
          .header h1 {
            margin: 0;
            font-size: 27px;
            line-height: 1.2;
          }
          .header .subtitle {
            margin-top: 4px;
            font-size: 14px;
            opacity: 0.94;
          }
          .header .meta {
            margin-top: 5px;
            font-size: 12px;
            opacity: 0.88;
          }
          .section {
            margin-top: 18px;
          }
          .card {
            background: #ffffff;
            border: 1px solid #dde4f5;
            border-radius: 14px;
            padding: 14px;
            box-shadow: 0 8px 20px rgba(45, 71, 145, 0.06);
          }
          .divider {
            margin-top: 16px;
            border: none;
            border-top: 1px solid #dde4f5;
          }
          .section-title {
            margin: 0 0 10px;
            color: #2b4fc8;
            font-size: 16px;
            font-weight: 700;
          }
          .section-title .icon {
            margin-right: 6px;
          }
          .profile-hero {
            display: grid;
            grid-template-columns: 96px 1fr;
            align-items: center;
            gap: 14px;
            background: linear-gradient(180deg, #f8faff, #eef3ff);
          }
          .student-photo {
            width: 88px;
            height: 88px;
            border-radius: 999px;
            border: 2px solid #c7d3f8;
            object-fit: cover;
            background: #ffffff;
          }
          .student-fallback {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 30px;
            font-weight: 800;
            color: #365bcf;
          }
          .hero-name {
            font-size: 27px;
            font-weight: 800;
            color: #1e3a8a;
            line-height: 1.2;
          }
          .hero-role {
            margin-top: 4px;
            font-size: 14px;
            font-weight: 700;
            color: #4338ca;
          }
          .hero-meta {
            margin-top: 4px;
            font-size: 13px;
            color: #475569;
          }
          .details-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 12px;
          }
          .details-column {
            display: grid;
            gap: 8px;
          }
          .detail-item {
            background: #f8faff;
            border: 1px solid #e2e8f7;
            border-radius: 10px;
            padding: 9px 10px;
          }
          .detail-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.35px;
            color: #64748b;
            margin-bottom: 3px;
          }
          .detail-value {
            font-size: 13px;
            font-weight: 700;
            color: #111827;
          }
          .skills-wrap {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
          }
          .skill-chip {
            background: linear-gradient(120deg, #e1e9ff, #ece6ff);
            color: #2f4cb7;
            border: 1px solid #cfdbff;
            border-radius: 999px;
            padding: 6px 11px;
            font-size: 12px;
            font-weight: 700;
          }
          .empty-text {
            color: #64748b;
            font-style: italic;
            font-size: 12px;
          }
          .timeline {
            position: relative;
            padding-left: 18px;
          }
          .timeline::before {
            content: "";
            position: absolute;
            top: 4px;
            bottom: 4px;
            left: 6px;
            width: 2px;
            background: #dbe4ff;
          }
          .timeline-item {
            position: relative;
            margin-bottom: 11px;
          }
          .timeline-item:last-child {
            margin-bottom: 0;
          }
          .timeline-dot {
            position: absolute;
            left: -16px;
            top: 8px;
            width: 10px;
            height: 10px;
            border-radius: 999px;
            background: linear-gradient(120deg, #3b82f6, #8b5cf6);
            border: 2px solid #f4f6ff;
          }
          .timeline-content {
            background: #f8faff;
            border: 1px solid #e2e8f7;
            border-radius: 10px;
            padding: 10px;
          }
          .timeline-title {
            font-size: 13px;
            font-weight: 700;
            color: #1e3a8a;
            margin-bottom: 5px;
          }
          .timeline-desc {
            font-size: 12px;
            color: #334155;
            line-height: 1.45;
            margin-bottom: 6px;
          }
          .timeline-range {
            display: inline-block;
            font-size: 11px;
            color: #4338ca;
            background: #eef2ff;
            border: 1px solid #dbe4ff;
            border-radius: 999px;
            padding: 4px 8px;
            font-weight: 700;
          }
        </style>

        <section class="header">
          <div class="brand-wrap">
            ${z}
            <div>
              <div style="font-size:15px; font-weight:700;">MoviCloud Labs</div>
              <div style="font-size:12px; opacity:0.92;">Student Portfolio Summary</div>
            </div>
          </div>
          <div style="text-align:right;">
            <h1>Internship Profile Report</h1>
            <div class="subtitle">Generated for ${i(e.name)}</div>
            <div class="meta">Generated on ${i(c)}</div>
          </div>
        </section>

        <section class="section">
          <div class="card profile-hero">
            ${C}
            <div>
              <div class="hero-name">${i(e.name)}</div>
              <div class="hero-role">${i(e.Role||"Intern")}</div>
              <div class="hero-meta">${i(e.COLLEGE||"Institution not specified")}</div>
              <div class="hero-meta">${i(e.email||"Email not available")}</div>
            </div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title"><span class="icon">▦</span>Personal & Internship Details</h2>
          <div class="card details-grid">
            <div class="details-column">
              <div class="detail-item"><div class="detail-label">Full Name</div><div class="detail-value">${i(e.name||"N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">Email</div><div class="detail-value">${i(e.email||"N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">Phone</div><div class="detail-value">${i(e.phone||"N/A")}</div></div>
            </div>
            <div class="details-column">
              <div class="detail-item"><div class="detail-label">Role</div><div class="detail-value">${i(e.Role||"N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">College</div><div class="detail-value">${i(e.COLLEGE||"N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">Status</div><div class="detail-value">${i(e.status||"N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">Duration</div><div class="detail-value">${i(e.duration||"N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">Start Date</div><div class="detail-value">${i(e.startDate||"N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">End Date</div><div class="detail-value">${i(e.endDate||"N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">Supervisor</div><div class="detail-value">${i(e.supervisor||"N/A")}</div></div>
              <div class="detail-item"><div class="detail-label">Supervisor Email</div><div class="detail-value">${i(e.supervisorEmail||"N/A")}</div></div>
            </div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title"><span class="icon">◉</span>Skills</h2>
          <div class="card">
            <div class="skills-wrap">${I}</div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title"><span class="icon">⟡</span>Task / Project Timeline</h2>
          <div class="card timeline">
            ${$}
          </div>
        </section>
      </div>
    `,v=document.createElement("div");v.style.position="fixed",v.style.left="-10000px",v.style.top="0",v.style.zIndex="-1",v.innerHTML=u,document.body.appendChild(v);const M=v.firstElementChild;if(!M){v.remove();return}const N=await se(M,{scale:2,useCORS:!0,backgroundColor:"#f4f6ff",windowWidth:900}),b=new le,R=b.internal.pageSize.getWidth(),A=b.internal.pageSize.getHeight(),W=R/N.width,q=12,y=A-q,E=Math.floor(y/W),w=[];let o=0;for(;o<N.height;){const l=Math.min(o+E,N.height);w.push({startPx:o,heightPx:l-o}),o=l}const k=w.length;w.forEach((l,j)=>{const h=document.createElement("canvas");h.width=N.width,h.height=l.heightPx;const x=h.getContext("2d");if(!x)return;x.drawImage(N,0,l.startPx,N.width,l.heightPx,0,0,N.width,l.heightPx),j>0&&b.addPage();const S=l.heightPx*W,ae=h.toDataURL("image/png",1);b.addImage(ae,"PNG",0,0,R,S,void 0,"MEDIUM");const L=A-q+2;b.setDrawColor(203,213,225),b.setLineWidth(.25),b.line(10,L,R-10,L),b.setFont("helvetica","normal"),b.setFontSize(9),b.setTextColor(71,85,105),b.text("Internship Feedback System | Student Profile Report",10,A-4),b.text(`Page ${j+1} of ${k}`,R-10,A-4,{align:"right"})}),v.remove(),b.save(`student-profile-${e.email}.pdf`)},Se=async()=>{if(!e)return;const a=new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),r=await ie(),c=(T==null?void 0:T.companyName)||"MoviCloud Labs",p=We(T),m=r?`<img class="brand-logo" src="${r}" alt="Company logo" />`:'<div class="brand-logo brand-fallback">MC</div>',f=p.map(o=>{const k=o.questions.map(h=>{const x=h.value;let S='<span class="answer-empty">N/A</span>';return h.type==="rating"&&typeof x=="number"?S=Oe(x):h.type==="boolean"&&typeof x=="boolean"?S=`<span class="answer-badge ${x?"badge-yes":"badge-no"}">${x?"Yes":"No"}</span>`:h.type==="enum"&&typeof x=="string"&&x.trim()?S=`<span class="answer-badge badge-enum">${i(He(x))}</span>`:h.type==="text"&&typeof x=="string"&&x.trim()&&(S=`<div class="answer-text">${i(x).replace(/\n/g,"<br />")}</div>`),`
              <div class="qa-row">
                <div class="qa-label">${i(h.label)}</div>
                <div class="qa-answer">${S}</div>
              </div>
            `}).join("");return`
          <section class="feedback-section card"${o.title.startsWith("Section 3")||o.title.startsWith("Section 6")?' style="break-before:page; page-break-before:always;"':""}>
            <h3>${i(o.title)}</h3>
            <div class="section-divider"></div>
            <div class="qa-list">${k}</div>
          </section>
        `}).join(""),z=`
      <div class="student-feedback-report-shell">
        <style>
          .student-feedback-report-shell {
            width: 794px;
            box-sizing: border-box;
            padding: 28px;
            font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
            color: #1f2937;
            background: #f8faff;
          }
          .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 14px;
            background: linear-gradient(120deg, #2c49c8, #6a46db);
            border-radius: 16px;
            padding: 18px 22px;
            color: #ffffff;
          }
          .brand-wrap {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .brand-logo {
            width: 44px;
            height: 44px;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.35);
            background: #ffffff;
            object-fit: cover;
          }
          .brand-fallback {
            display: flex;
            align-items: center;
            justify-content: center;
            color: #334155;
            font-weight: 800;
            font-size: 13px;
          }
          .header h1 {
            margin: 0;
            font-size: 27px;
            line-height: 1.2;
          }
          .header .subtitle {
            margin-top: 4px;
            font-size: 14px;
            opacity: 0.94;
          }
          .header .meta {
            margin-top: 5px;
            font-size: 12px;
            opacity: 0.88;
          }
          .section {
            margin-top: 18px;
          }
          .card {
            background: #ffffff;
            border: 1px solid #dde4f5;
            border-radius: 14px;
            padding: 14px;
            box-shadow: 0 8px 20px rgba(45, 71, 145, 0.06);
          }
          .student-info-grid {
            display: grid;
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 10px;
          }
          .info-item {
            background: #f8faff;
            border: 1px solid #e2e8f7;
            border-radius: 10px;
            padding: 9px 10px;
          }
          .info-label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 0.35px;
            color: #64748b;
            margin-bottom: 3px;
          }
          .info-value {
            font-size: 13px;
            font-weight: 700;
            color: #111827;
          }
          .feedback-sections {
            margin-top: 18px;
          }
          .feedback-section {
            margin-top: 24px;
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .feedback-section:first-child {
            margin-top: 0;
          }
          .feedback-section h3 {
            margin: 0;
            font-size: 16px;
            font-weight: 700;
            color: #1e3a8a;
          }
          .section-divider {
            border-top: 1px solid #dde4f5;
            margin: 10px 0 2px;
          }
          .qa-list {
            margin-top: 6px;
          }
          .qa-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 12px;
            padding: 11px 0;
            border-bottom: 1px solid #eef2ff;
            align-items: start;
          }
          .qa-row:last-child {
            border-bottom: none;
          }
          .qa-label {
            color: #334155;
            font-size: 13px;
            font-weight: 600;
          }
          .qa-answer {
            color: #0f172a;
            font-size: 13px;
            font-weight: 600;
          }
          .answer-rating {
            display: flex;
            align-items: center;
            gap: 8px;
          }
          .answer-stars {
            letter-spacing: 2px;
            color: #f59e0b;
            font-size: 14px;
          }
          .answer-rating-number {
            color: #1f2937;
            font-weight: 700;
            font-size: 12px;
          }
          .answer-badge {
            display: inline-block;
            border-radius: 999px;
            padding: 5px 10px;
            font-size: 12px;
            font-weight: 700;
            border: 1px solid transparent;
          }
          .badge-yes {
            background: #dcfce7;
            color: #166534;
            border-color: #86efac;
          }
          .badge-no {
            background: #fee2e2;
            color: #b91c1c;
            border-color: #fca5a5;
          }
          .badge-enum {
            background: #eef2ff;
            color: #4338ca;
            border-color: #c7d2fe;
          }
          .answer-text {
            color: #1f2937;
            line-height: 1.5;
            font-weight: 500;
          }
          .answer-empty {
            color: #64748b;
            font-style: italic;
            font-weight: 500;
          }
        </style>

        <section class="header">
          <div class="brand-wrap">
            ${m}
            <div>
              <div style="font-size:15px; font-weight:700;">${i(c)}</div>
              <div style="font-size:12px; opacity:0.92;">Student Evaluation Summary</div>
            </div>
          </div>
          <div style="text-align:right;">
            <h1>Student Feedback Report</h1>
            <div class="subtitle">Generated for ${i(e.name)}</div>
            <div class="meta">Generated on ${i(a)}</div>
          </div>
        </section>

        <section class="section card">
          <h2 style="margin:0 0 10px; color:#2b4fc8; font-size:16px; font-weight:700;">Student Information</h2>
          <div class="student-info-grid">
            <div class="info-item"><div class="info-label">Student Name</div><div class="info-value">${i(e.name||"N/A")}</div></div>
            <div class="info-item"><div class="info-label">Email</div><div class="info-value">${i(e.email||"N/A")}</div></div>
            <div class="info-item"><div class="info-label">Company</div><div class="info-value">${i(c)}</div></div>
          </div>
        </section>

        <div class="feedback-sections">
          ${f}
        </div>
      </div>
    `,C=document.createElement("div");C.style.position="fixed",C.style.left="-10000px",C.style.top="0",C.style.zIndex="-1",C.innerHTML=z,document.body.appendChild(C);const I=C.firstElementChild;if(!I){C.remove();return}const $=await se(I,{scale:2,useCORS:!0,backgroundColor:"#f8faff",windowWidth:900}),u=new le,v=u.internal.pageSize.getWidth(),M=u.internal.pageSize.getHeight(),N=v/$.width,b=12,R=$.width/I.scrollWidth,A=Array.from(I.querySelectorAll(".feedback-section")),y=[0,...[2,5].filter(o=>o<A.length).map(o=>Math.round(A[o].offsetTop*R)),$.height],E=[];for(let o=0;o<y.length-1;o++){const k=y[o],l=y[o+1];l>k&&E.push({startPx:k,heightPx:l-k})}const w=E.length;E.forEach((o,k)=>{const l=document.createElement("canvas");l.width=$.width,l.height=o.heightPx;const j=l.getContext("2d");if(!j)return;j.drawImage($,0,o.startPx,$.width,o.heightPx,0,0,$.width,o.heightPx),k>0&&u.addPage();const h=l.toDataURL("image/png",1),x=o.heightPx*N;u.addImage(h,"PNG",0,0,v,x,void 0,"MEDIUM");const S=M-b+2;u.setDrawColor(203,213,225),u.setLineWidth(.25),u.line(10,S,v-10,S),u.setFont("helvetica","normal"),u.setFontSize(9),u.setTextColor(71,85,105),u.text("Generated by Internship Feedback System",10,M-4),u.text(a,v/2,M-4,{align:"center"}),u.text(`Page ${k+1} of ${w}`,v-10,M-4,{align:"right"})}),C.remove(),u.save(`student-feedback-${e.email}.pdf`)},ce=P.useCallback(async()=>{if(!te)return;const a=document.createElement("a");a.href=te,a.download=`internship-certificate-${(e==null?void 0:e.name)??"student"}.pdf`,document.body.appendChild(a),a.click(),document.body.removeChild(a)},[te,e==null?void 0:e.name]),O=P.useMemo(()=>e?[{title:"Company Feedback Report",description:"Company evaluation data generated from backend records",icon:Ie,fileType:"PDF",size:"Generated on download",color:"primary",fileName:`company-feedback-${e.email}.pdf`,onDownload:ke},{title:"Internship Profile Summary",description:"Student profile and internship details from backend",icon:fe,fileType:"PDF",size:"Generated on download",color:"accent",fileName:`student-profile-${e.email}.pdf`,onDownload:Ce},{title:"Student Feedback Submission",description:"Your submitted feedback about the company",icon:Ae,fileType:"PDF",size:"Generated on download",color:"success",fileName:`student-feedback-${e.email}.pdf`,onDownload:Se},{title:"Internship Certificate",description:G?"Your official internship completion certificate issued by MoviCloud":"Certificate has not been issued yet — check back later",icon:fe,fileType:"PDF",size:G?"Issued by admin":"Not available",color:"warning",fileName:`internship-certificate-${e.name??"student"}.pdf`,onDownload:ce}]:[],[s,e,T,G,ce]),Y=ee||Z!==null,$e=async a=>{if(!Y){_(a.fileName);try{await a.onDownload()}finally{_(null)}}},Pe=async()=>{if(!(Y||O.length===0)){de(!0);try{for(const a of O)a.color==="warning"&&!G||(_(a.fileName),await a.onDownload(),await new Promise(r=>setTimeout(r,400)))}finally{_(null),de(!1)}}};if(ve)return n.jsx(Ee,{title:"Loading downloads",description:"Fetching your reports and feedback data..."});const Ne={primary:{bg:"bg-gradient-to-br from-indigo-500 to-purple-600",shadow:"shadow-indigo-500/50"},accent:{bg:"bg-gradient-to-br from-teal-500 to-cyan-600",shadow:"shadow-teal-500/50"},success:{bg:"bg-gradient-to-br from-emerald-500 to-teal-600",shadow:"shadow-emerald-500/50"},warning:{bg:"bg-gradient-to-br from-amber-500 to-orange-500",shadow:"shadow-amber-500/50"}};return n.jsxs("div",{className:"min-h-full bg-background",children:[n.jsx("div",{className:"bg-gradient-to-r from-primary/10 via-purple-50 to-accent/10 border-b border-border",children:n.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10",children:n.jsx(V.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.4},children:n.jsxs("div",{className:"flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",children:[n.jsxs("div",{children:[n.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[n.jsx(re,{className:"w-5 h-5 text-primary"}),n.jsx("span",{className:"text-sm font-semibold text-primary",children:"Downloads"})]}),n.jsx("h1",{className:"text-2xl sm:text-4xl font-bold text-foreground mb-2",children:"Downloads"}),n.jsx("p",{className:"text-muted-foreground text-lg",children:"Download your feedback reports and certificates"})]}),n.jsxs("div",{className:"inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20 whitespace-nowrap",children:[n.jsx(Te,{className:"w-5 h-5 text-primary shrink-0"}),n.jsxs("span",{className:"font-semibold text-primary",children:[O.length," files"]})]})]})})})}),n.jsxs("div",{className:"max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-8",children:[n.jsx("div",{className:"space-y-5",children:O.map((a,r)=>{const c=a.icon,p=Ne[a.color],m=a.color==="warning",f=m&&!G;return n.jsx(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:.1+r*.1},whileHover:{y:-4,transition:{duration:.2}},className:"bg-card border border-border rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow",children:n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6",children:[n.jsxs("div",{className:"flex items-start gap-5 flex-1 min-w-0",children:[n.jsx(V.div,{whileHover:{scale:1.1,rotate:5},className:`p-4 rounded-xl ${p.bg} text-white shadow-lg ${p.shadow}`,children:n.jsx(c,{className:"w-7 h-7"})}),n.jsxs("div",{className:"flex-1 min-w-0",children:[n.jsx("h3",{className:"text-lg font-bold text-foreground mb-2",children:a.title}),n.jsx("p",{className:"text-sm text-muted-foreground leading-relaxed mb-4",children:a.description}),n.jsxs("div",{className:"flex items-center gap-3 flex-wrap",children:[n.jsx("span",{className:"px-3 py-1 bg-secondary rounded-lg text-xs font-semibold text-secondary-foreground",children:a.fileType}),n.jsx("span",{className:"text-sm text-muted-foreground font-medium",children:a.size}),m&&(G?n.jsxs("span",{className:"inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200",children:[n.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"}),"Available"]}):n.jsxs("span",{className:"inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200",children:[n.jsx("span",{className:"w-1.5 h-1.5 rounded-full bg-amber-400"}),"Not Issued"]}))]})]})]}),n.jsxs(me,{className:"flex w-full sm:w-auto items-center justify-center gap-2 shadow-md",size:"lg",onClick:()=>{$e(a)},disabled:Y||f,children:[Z===a.fileName?n.jsx(ge,{className:"w-4 h-4 animate-spin"}):n.jsx(re,{className:"w-4 h-4"}),Z===a.fileName?"Generating...":f?"Not Available":"Download"]})]})},a.title)})}),n.jsx(V.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:.4},className:"mt-8 flex justify-center",children:n.jsxs(me,{size:"lg",variant:"outline",className:"flex items-center gap-2 shadow-md hover:shadow-lg",onClick:()=>{Pe()},disabled:O.length===0||Y,children:[ee?n.jsx(ge,{className:"w-5 h-5 animate-spin"}):n.jsx(re,{className:"w-5 h-5"}),ee?"Generating Files...":"Download All Files"]})})]})]})}export{Qe as default};

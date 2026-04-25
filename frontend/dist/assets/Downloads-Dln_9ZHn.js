import{r as I,j as n,m as Q}from"./vendor-motion-64cHM4kP.js";import{B as de}from"./button-BDp87rQ6.js";import{a as $e,A as Pe,c as Ce,d as ae}from"./index-KUtn7KXC.js";import{h as oe,E as ne}from"./vendor-pdf-CpQDe1Cb.js";import{B as Ne,w as je,F as ze,D as se,y as De,z as ce}from"./vendor-lucide-CDzpAvCT.js";const Me="[SYSTEM_META]",Ee=[{title:"Technical Skills",metrics:[{key:"technicalKnowledge",label:"Technical Knowledge"},{key:"codeQualityImplementation",label:"Code Quality & Implementation"},{key:"skillImprovement",label:"Skill Improvement"}]},{title:"Work Execution",metrics:[{key:"taskCompletion",label:"Task Completion"},{key:"productivity",label:"Productivity"},{key:"attentionToDetail",label:"Attention to Detail"},{key:"ownershipOfTasks",label:"Ownership of Tasks"}]},{title:"Communication",metrics:[{key:"communicationClarity",label:"Communication Clarity"},{key:"reportingUpdates",label:"Reporting & Updates"}]},{title:"Professional Behavior",metrics:[{key:"punctuality",label:"Punctuality"},{key:"responsibility",label:"Responsibility"},{key:"discipline",label:"Discipline"}]},{title:"Teamwork",metrics:[{key:"collaboration",label:"Collaboration"},{key:"contributionToTeamProject",label:"Contribution to Team Project"}]},{title:"Learning & Growth",metrics:[{key:"adaptability",label:"Adaptability"},{key:"opennessToFeedback",label:"Openness to Feedback"},{key:"learningAbility",label:"Learning Ability"},{key:"initiativeToLearnNewThings",label:"Initiative to Learn New Things"}]}],Ie=[{id:"internship_experience",title:"Section 1: Internship Experience",questions:[{id:"overallInternshipExperience",label:"Overall internship experience",type:"rating"},{id:"relevanceToStudy",label:"Relevance to field",type:"rating"},{id:"learningOutcomesSatisfaction",label:"Learning outcomes",type:"rating"},{id:"onboardingProcess",label:"Onboarding process",type:"rating"},{id:"teamMentorSupport",label:"Team/mentor support",type:"rating"}]},{id:"learning_development",title:"Section 2: Learning & Development",questions:[{id:"practicalKnowledge",label:"Practical knowledge gained",type:"boolean"},{id:"newSkillsLearned",label:"New skills learned",type:"text"},{id:"confidenceApplyingSkills",label:"Confidence level",type:"rating"},{id:"realTimeProjects",label:"Real-time project exposure",type:"boolean"}]},{id:"mentorship_support",title:"Section 3: Mentorship & Support",questions:[{id:"mentorGuidance",label:"Mentor guidance",type:"rating"},{id:"feedbackRegular",label:"Feedback frequency",type:"boolean"},{id:"communicationClear",label:"Communication clarity",type:"rating"},{id:"comfortableAskingQuestions",label:"Comfort asking questions",type:"boolean"}]},{id:"work_environment",title:"Section 4: Work Environment",questions:[{id:"workCulture",label:"Work culture",type:"rating"},{id:"tasksClearlyAssigned",label:"Task clarity",type:"boolean"},{id:"workloadManageable",label:"Workload manageability",type:"rating"},{id:"metExpectations",label:"Expectations met",type:"boolean"}]},{id:"project_feedback",title:"Section 5: Project Feedback",questions:[{id:"requirementsExplained",label:"Requirement clarity",type:"boolean"},{id:"projectChallengeLevel",label:"Project difficulty",type:"enum"},{id:"projectImprovedSkills",label:"Skill improvement",type:"boolean"},{id:"projectExperienceRating",label:"Project rating",type:"rating"}]},{id:"overall_satisfaction",title:"Section 6: Overall Satisfaction",questions:[{id:"recommendToOthers",label:"Recommend internship",type:"boolean"},{id:"interestedFutureOpportunities",label:"Interested in future opportunities",type:"boolean"},{id:"overallSatisfaction",label:"Overall satisfaction",type:"rating"}]},{id:"suggestions_feedback",title:"Section 7: Suggestions & Feedback",questions:[{id:"likedMost",label:"What did you like most",type:"text"},{id:"challengesFaced",label:"Challenges faced",type:"text"},{id:"improvementsSuggested",label:"Improvements suggested",type:"text"},{id:"additionalComments",label:"Additional comments",type:"text"}]},{id:"assessment_policy",title:"Section 8: Assessment Policy",questions:[{id:"durationSufficient",label:"Internship duration sufficient",type:"boolean"},{id:"stipendFair",label:"Stipend policy fairness",type:"boolean"},{id:"continueWithStipend",label:"Willingness to continue",type:"boolean"}]}];function Ae(t){if(!t)return"";const d=t.indexOf(Me);return d===-1?t.trim():t.slice(0,d).trim()}function i(t){return t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function Te(t){const d=t.toLowerCase();return d.includes("highly")?"badge-high":d.includes("not")?"badge-low":d.includes("conditional")?"badge-mid":"badge-good"}function pe(t){return t!=null&&t.trim()?t.split(/\r?\n|\u2022|;/).map(d=>d.trim()).filter(Boolean):[]}function Re(t){return t.split(/[ _-]+/).map(d=>d?d[0].toUpperCase()+d.slice(1).toLowerCase():"").join(" ")}function Le(t){const d=Math.max(0,Math.min(5,t)),e=Math.round(d);return`<div class="answer-rating"><span class="answer-stars">${`${"&#9733;".repeat(e)}${"&#9734;".repeat(5-e)}`}</span><span class="answer-rating-number">${d.toFixed(1)} / 5</span></div>`}function Fe(t){var e;if((e=t==null?void 0:t.sections)!=null&&e.length)return t.sections.map(j=>({sectionId:j.sectionId,title:j.title,questions:j.questions.map(o=>({questionId:o.questionId,label:o.label,type:o.type,value:o.value}))}));const d={overallInternshipExperience:(t==null?void 0:t.learningExperience)??null,mentorGuidance:(t==null?void 0:t.mentorship)??null,workCulture:(t==null?void 0:t.workEnvironment)??null,communicationClear:(t==null?void 0:t.communication)??null,likedMost:(t==null?void 0:t.strengths)??null,improvementsSuggested:(t==null?void 0:t.improvements)??null,additionalComments:(t==null?void 0:t.overallComments)??null};return Ie.map(j=>({sectionId:j.id,title:j.title,questions:j.questions.map(o=>({questionId:o.id,label:o.label,type:o.type,value:d[o.id]??null}))}))}function qe(){const t=Pe,{user:d}=$e(),[e,j]=I.useState(null),[o,me]=I.useState(null),[A,ge]=I.useState(null),[fe,V]=I.useState(!0),[J,q]=I.useState(null),[X,le]=I.useState(!1),_=I.useRef(null);I.useEffect(()=>{(async()=>{if(!(d!=null&&d.email)){V(!1);return}try{const c=await ae(`${t}/students/profile/${encodeURIComponent(d.email)}`);if(!c.ok){V(!1);return}const r=await c.json();j(r);const[p,m]=await Promise.all([ae(`${t}/feedback/company?student_id=${encodeURIComponent(r.id)}`),ae(`${t}/feedback/student?student_email=${encodeURIComponent(d.email)}`)]);if(p.ok){const k=await p.json();me(k[0]??null)}if(m.ok){const k=await m.json();ge(k[0]??null)}}finally{V(!1)}})()},[t,d==null?void 0:d.email]);const Z=async()=>{if(_.current)return _.current;try{const s=new Image;s.src="/favicon.png",await new Promise((m,k)=>{s.onload=()=>m(),s.onerror=()=>k(new Error("Failed to load logo"))});const c=160,r=document.createElement("canvas");r.width=c,r.height=c;const p=r.getContext("2d");return p?(p.beginPath(),p.arc(c/2,c/2,c/2,0,Math.PI*2),p.closePath(),p.clip(),p.drawImage(s,0,0,c,c),_.current=r.toDataURL("image/png"),_.current):null}catch{return null}},ue=async s=>{try{const c=new Image;c.src=s,await new Promise((k,F)=>{c.onload=()=>k(),c.onerror=()=>F(new Error("Failed to load profile photo"))});const r=240,p=document.createElement("canvas");p.width=r,p.height=r;const m=p.getContext("2d");return m?(m.clearRect(0,0,r,r),m.beginPath(),m.arc(r/2,r/2,r/2,0,Math.PI*2),m.closePath(),m.clip(),m.drawImage(c,0,0,r,r),p.toDataURL("image/png")):null}catch{return null}},he=async()=>{if(!e)return;const s=new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),c=Ae(o==null?void 0:o.comments),r=pe(o==null?void 0:o.strengths),p=pe(o==null?void 0:o.improvements),m=await Z(),k=e.name||(o==null?void 0:o.studentName)||"Student",F=e.supervisor||"Company Evaluator",S=(A==null?void 0:A.companyName)||"MoviCloud Labs",M=(o==null?void 0:o.recommendation)||"Recommended",P=(o==null?void 0:o.overallRating)??0,f=(o==null?void 0:o.ratings)??{},x=m?`<img class="logo" src="${m}" alt="Company logo" />`:`<div class="logo logo-fallback">${i((S.slice(0,2)||"MC").toUpperCase())}</div>`,z=Math.max(0,Math.min(5,Math.round(P||0))),C=`${"&#9733;".repeat(z)}${"&#9734;".repeat(5-z)}`,v=Ee.map(g=>{const K=g.metrics.map(U=>{const G=Number(f[U.key]??0),ie=Math.max(0,Math.min(100,G/5*100));return`
            <div class="metric-row">
              <div class="metric-top">
                <span class="metric-label">${i(U.label)}</span>
                <span class="metric-value">${G?G.toFixed(1):"0.0"} / 5</span>
              </div>
              <div class="metric-track">
                <div class="metric-fill" style="width:${ie}%;"></div>
              </div>
            </div>
          `}).join("");return`
        <section class="card metric-card">
          <h3>${i(g.title)}</h3>
          ${K}
        </section>
      `}).join(""),T=r.length>0?`<ul class="bullet-list">${r.map(g=>`<li>${i(g)}</li>`).join("")}</ul>`:'<p class="muted">No strengths provided.</p>',E=p.length>0?`<ul class="bullet-list">${p.map(g=>`<li>${i(g)}</li>`).join("")}</ul>`:'<p class="muted">No areas for growth provided.</p>',O=c?`<p>${i(c)}</p>`:'<p class="muted">No overall comments provided.</p>',W=`
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
            ${x}
            <div>
              <div style="font-size:15px; font-weight:700;">${i(S)}</div>
              <div style="font-size:12px; opacity:0.92;">Evaluation Summary</div>
            </div>
          </div>
          <div class="title-wrap" style="text-align:right;">
            <h1>Internship Feedback Report</h1>
            <div class="subtitle">Generated for ${i(k)}</div>
            <div class="meta">Generated on ${i(s)}</div>
          </div>
        </section>

        <section class="section">
          <h2 class="section-title">Student Information</h2>
          <div class="card student-grid">
            <div class="field"><span class="label">Student Name</span><span class="value">${i(k)}</span></div>
            <div class="field"><span class="label">Email</span><span class="value">${i(e.email||"N/A")}</span></div>
            <div class="field"><span class="label">Project</span><span class="value">${i((o==null?void 0:o.projectTitle)||"N/A")}</span></div>
            <div class="field"><span class="label">Internship Duration</span><span class="value">${i((o==null?void 0:o.duration)||e.duration||"N/A")}</span></div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title">Overall Performance</h2>
          <div class="card overall">
            <div>
              <div class="overall-score">
                <span class="score">${P.toFixed(1)}</span>
                <span class="outof">/ 5</span>
              </div>
              <div class="stars">${C}</div>
            </div>
            <div class="evaluator">Evaluator: ${i(F)}</div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title">Performance Metrics</h2>
          <div class="metrics-grid">
            ${v}
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title">Detailed Feedback</h2>
          <div class="feedback-grid">
            <div class="card">
              <h4>Strengths</h4>
              ${T}
            </div>
            <div class="card">
              <h4>Areas for Growth</h4>
              ${E}
            </div>
            <div class="card">
              <h4>Overall Comments</h4>
              ${O}
            </div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title">Final Recommendation</h2>
          <div class="card recommendation">
            <div style="font-size:13px; color:#334155;">Recommendation from company evaluator</div>
            <div class="badge ${Te(M)}">${i(M)}</div>
          </div>
        </section>
      </div>
    `,b=document.createElement("div");b.style.position="fixed",b.style.left="-10000px",b.style.top="0",b.style.zIndex="-1",b.innerHTML=W,document.body.appendChild(b);const D=b.firstElementChild;if(!D){b.remove();return}const y=await oe(D,{scale:2,useCORS:!0,backgroundColor:"#f3f5fb",windowWidth:900}),a=new ne,w=a.internal.pageSize.getWidth(),l=a.internal.pageSize.getHeight(),N=w/y.width,u=12,h=l-u,$=Math.floor(h/N),ee=y.width/D.scrollWidth,R=Array.from(D.querySelectorAll(".metric-card")),Y=R.length>=2?Math.round(Math.min(R[R.length-2].offsetTop,R[R.length-1].offsetTop)*ee):null,te=[];let L=0;for(;L<y.height;){let g=Math.min(L+$,y.height);Y!==null&&L<Y&&g>Y&&(g=Y),g<=L&&(g=Math.min(L+$,y.height)),te.push({startPx:L,heightPx:g-L}),L=g}const ke=te.length;te.forEach((g,K)=>{const U=document.createElement("canvas");U.width=y.width,U.height=g.heightPx;const G=U.getContext("2d");if(!G)return;G.drawImage(y,0,g.startPx,y.width,g.heightPx,0,0,y.width,g.heightPx),K>0&&a.addPage();const ie=g.heightPx*N,Se=U.toDataURL("image/png",1);a.addImage(Se,"PNG",0,0,w,ie,void 0,"MEDIUM");const re=l-u+2;a.setDrawColor(203,213,225),a.setLineWidth(.25),a.line(10,re,w-10,re),a.setFont("helvetica","normal"),a.setFontSize(9),a.setTextColor(71,85,105),a.text("Internship Feedback System | MoviCloud Labs",10,l-4),a.text(`Page ${K+1} of ${ke}`,w-10,l-4,{align:"right"})}),b.remove(),a.save(`company-feedback-${e.email}.pdf`)},xe=async()=>{if(!e)return;const s=e.skills??[],c=e.tasks??[],r=new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),p=await Z(),m=e.profilePhoto?await ue(e.profilePhoto):null,k=e.name.split(" ").map(l=>l[0]).join("").slice(0,2).toUpperCase(),F=p?`<img class="brand-logo" src="${p}" alt="Company logo" />`:'<div class="brand-logo brand-fallback">MC</div>',S=m?`<img class="student-photo" src="${m}" alt="Student photo" />`:`<div class="student-photo student-fallback">${i(k||"ST")}</div>`,M=s.length>0?s.map(l=>`<span class="skill-chip">${i(l)}</span>`).join(""):'<span class="empty-text">No skills added yet.</span>',P=c.length>0?c.map((l,N)=>{const u=e.startDate&&e.endDate?`${e.startDate} - ${e.endDate}`:e.duration||"Timeline not specified";return`
                <article class="timeline-item">
                  <div class="timeline-dot"></div>
                  <div class="timeline-content">
                    <div class="timeline-title">${N+1}. ${i(l.title||"Untitled Task")}</div>
                    <div class="timeline-desc">${i(l.description||"No description provided").replace(/\n/g,"<br />")}</div>
                    <div class="timeline-range">${i(u)}</div>
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
          `,f=`
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
            ${F}
            <div>
              <div style="font-size:15px; font-weight:700;">MoviCloud Labs</div>
              <div style="font-size:12px; opacity:0.92;">Student Portfolio Summary</div>
            </div>
          </div>
          <div style="text-align:right;">
            <h1>Internship Profile Report</h1>
            <div class="subtitle">Generated for ${i(e.name)}</div>
            <div class="meta">Generated on ${i(r)}</div>
          </div>
        </section>

        <section class="section">
          <div class="card profile-hero">
            ${S}
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
            <div class="skills-wrap">${M}</div>
          </div>
        </section>

        <hr class="divider" />

        <section class="section">
          <h2 class="section-title"><span class="icon">⟡</span>Task / Project Timeline</h2>
          <div class="card timeline">
            ${P}
          </div>
        </section>
      </div>
    `,x=document.createElement("div");x.style.position="fixed",x.style.left="-10000px",x.style.top="0",x.style.zIndex="-1",x.innerHTML=f,document.body.appendChild(x);const z=x.firstElementChild;if(!z){x.remove();return}const C=await oe(z,{scale:2,useCORS:!0,backgroundColor:"#f4f6ff",windowWidth:900}),v=new ne,T=v.internal.pageSize.getWidth(),E=v.internal.pageSize.getHeight(),O=T/C.width,W=12,b=E-W,D=Math.floor(b/O),y=[];let a=0;for(;a<C.height;){const l=Math.min(a+D,C.height);y.push({startPx:a,heightPx:l-a}),a=l}const w=y.length;y.forEach((l,N)=>{const u=document.createElement("canvas");u.width=C.width,u.height=l.heightPx;const h=u.getContext("2d");if(!h)return;h.drawImage(C,0,l.startPx,C.width,l.heightPx,0,0,C.width,l.heightPx),N>0&&v.addPage();const $=l.heightPx*O,ee=u.toDataURL("image/png",1);v.addImage(ee,"PNG",0,0,T,$,void 0,"MEDIUM");const R=E-W+2;v.setDrawColor(203,213,225),v.setLineWidth(.25),v.line(10,R,T-10,R),v.setFont("helvetica","normal"),v.setFontSize(9),v.setTextColor(71,85,105),v.text("Internship Feedback System | Student Profile Report",10,E-4),v.text(`Page ${N+1} of ${w}`,T-10,E-4,{align:"right"})}),x.remove(),v.save(`student-profile-${e.email}.pdf`)},ve=async()=>{if(!e)return;const s=new Date().toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"}),c=await Z(),r=(A==null?void 0:A.companyName)||"MoviCloud Labs",p=Fe(A),m=c?`<img class="brand-logo" src="${c}" alt="Company logo" />`:'<div class="brand-logo brand-fallback">MC</div>',k=p.map(a=>{const w=a.questions.map(u=>{const h=u.value;let $='<span class="answer-empty">N/A</span>';return u.type==="rating"&&typeof h=="number"?$=Le(h):u.type==="boolean"&&typeof h=="boolean"?$=`<span class="answer-badge ${h?"badge-yes":"badge-no"}">${h?"Yes":"No"}</span>`:u.type==="enum"&&typeof h=="string"&&h.trim()?$=`<span class="answer-badge badge-enum">${i(Re(h))}</span>`:u.type==="text"&&typeof h=="string"&&h.trim()&&($=`<div class="answer-text">${i(h).replace(/\n/g,"<br />")}</div>`),`
              <div class="qa-row">
                <div class="qa-label">${i(u.label)}</div>
                <div class="qa-answer">${$}</div>
              </div>
            `}).join("");return`
          <section class="feedback-section card"${a.title.startsWith("Section 3")||a.title.startsWith("Section 6")?' style="break-before:page; page-break-before:always;"':""}>
            <h3>${i(a.title)}</h3>
            <div class="section-divider"></div>
            <div class="qa-list">${w}</div>
          </section>
        `}).join(""),F=`
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
              <div style="font-size:15px; font-weight:700;">${i(r)}</div>
              <div style="font-size:12px; opacity:0.92;">Student Evaluation Summary</div>
            </div>
          </div>
          <div style="text-align:right;">
            <h1>Student Feedback Report</h1>
            <div class="subtitle">Generated for ${i(e.name)}</div>
            <div class="meta">Generated on ${i(s)}</div>
          </div>
        </section>

        <section class="section card">
          <h2 style="margin:0 0 10px; color:#2b4fc8; font-size:16px; font-weight:700;">Student Information</h2>
          <div class="student-info-grid">
            <div class="info-item"><div class="info-label">Student Name</div><div class="info-value">${i(e.name||"N/A")}</div></div>
            <div class="info-item"><div class="info-label">Email</div><div class="info-value">${i(e.email||"N/A")}</div></div>
            <div class="info-item"><div class="info-label">Company</div><div class="info-value">${i(r)}</div></div>
          </div>
        </section>

        <div class="feedback-sections">
          ${k}
        </div>
      </div>
    `,S=document.createElement("div");S.style.position="fixed",S.style.left="-10000px",S.style.top="0",S.style.zIndex="-1",S.innerHTML=F,document.body.appendChild(S);const M=S.firstElementChild;if(!M){S.remove();return}const P=await oe(M,{scale:2,useCORS:!0,backgroundColor:"#f8faff",windowWidth:900}),f=new ne,x=f.internal.pageSize.getWidth(),z=f.internal.pageSize.getHeight(),C=x/P.width,v=12,T=P.width/M.scrollWidth,E=Array.from(M.querySelectorAll(".feedback-section")),b=[0,...[2,5].filter(a=>a<E.length).map(a=>Math.round(E[a].offsetTop*T)),P.height],D=[];for(let a=0;a<b.length-1;a++){const w=b[a],l=b[a+1];l>w&&D.push({startPx:w,heightPx:l-w})}const y=D.length;D.forEach((a,w)=>{const l=document.createElement("canvas");l.width=P.width,l.height=a.heightPx;const N=l.getContext("2d");if(!N)return;N.drawImage(P,0,a.startPx,P.width,a.heightPx,0,0,P.width,a.heightPx),w>0&&f.addPage();const u=l.toDataURL("image/png",1),h=a.heightPx*C;f.addImage(u,"PNG",0,0,x,h,void 0,"MEDIUM");const $=z-v+2;f.setDrawColor(203,213,225),f.setLineWidth(.25),f.line(10,$,x-10,$),f.setFont("helvetica","normal"),f.setFontSize(9),f.setTextColor(71,85,105),f.text("Generated by Internship Feedback System",10,z-4),f.text(s,x/2,z-4,{align:"center"}),f.text(`Page ${w+1} of ${y}`,x-10,z-4,{align:"right"})}),S.remove(),f.save(`student-feedback-${e.email}.pdf`)},H=I.useMemo(()=>e?[{title:"Company Feedback Report",description:"Company evaluation data generated from backend records",icon:Ne,fileType:"PDF",size:"Generated on download",color:"primary",fileName:`company-feedback-${e.email}.pdf`,onDownload:he},{title:"Internship Profile Summary",description:"Student profile and internship details from backend",icon:je,fileType:"PDF",size:"Generated on download",color:"accent",fileName:`student-profile-${e.email}.pdf`,onDownload:xe},{title:"Student Feedback Submission",description:"Your submitted feedback about the company",icon:ze,fileType:"PDF",size:"Generated on download",color:"success",fileName:`student-feedback-${e.email}.pdf`,onDownload:ve}]:[],[o,e,A]),B=X||J!==null,be=async s=>{if(!B){q(s.fileName);try{await s.onDownload()}finally{q(null)}}},ye=async()=>{if(!(B||H.length===0)){le(!0);try{for(const s of H)q(s.fileName),await s.onDownload()}finally{q(null),le(!1)}}};if(fe)return n.jsx(Ce,{title:"Loading downloads",description:"Fetching your reports and feedback data..."});const we={primary:{bg:"bg-gradient-to-br from-indigo-500 to-purple-600",shadow:"shadow-indigo-500/50"},accent:{bg:"bg-gradient-to-br from-teal-500 to-cyan-600",shadow:"shadow-teal-500/50"},success:{bg:"bg-gradient-to-br from-emerald-500 to-teal-600",shadow:"shadow-emerald-500/50"}};return n.jsxs("div",{className:"min-h-full bg-background",children:[n.jsx("div",{className:"bg-gradient-to-r from-primary/10 via-purple-50 to-accent/10 border-b border-border",children:n.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-8 py-6 sm:py-10",children:n.jsx(Q.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},transition:{duration:.4},children:n.jsxs("div",{className:"flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",children:[n.jsxs("div",{children:[n.jsxs("div",{className:"flex items-center gap-2 mb-2",children:[n.jsx(se,{className:"w-5 h-5 text-primary"}),n.jsx("span",{className:"text-sm font-semibold text-primary",children:"Downloads"})]}),n.jsx("h1",{className:"text-2xl sm:text-4xl font-bold text-foreground mb-2",children:"Downloads"}),n.jsx("p",{className:"text-muted-foreground text-lg",children:"Download your feedback reports and certificates"})]}),n.jsxs("div",{className:"inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl border border-primary/20 whitespace-nowrap",children:[n.jsx(De,{className:"w-5 h-5 text-primary shrink-0"}),n.jsxs("span",{className:"font-semibold text-primary",children:[H.length," files"]})]})]})})})}),n.jsxs("div",{className:"max-w-5xl mx-auto px-4 sm:px-8 py-6 sm:py-8",children:[n.jsx("div",{className:"space-y-5",children:H.map((s,c)=>{const r=s.icon,p=we[s.color];return n.jsx(Q.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:.1+c*.1},whileHover:{y:-4,transition:{duration:.2}},className:"bg-card border border-border rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow",children:n.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6",children:[n.jsxs("div",{className:"flex items-start gap-5 flex-1 min-w-0",children:[n.jsx(Q.div,{whileHover:{scale:1.1,rotate:5},className:`p-4 rounded-xl ${p.bg} text-white shadow-lg ${p.shadow}`,children:n.jsx(r,{className:"w-7 h-7"})}),n.jsxs("div",{className:"flex-1 min-w-0",children:[n.jsx("h3",{className:"text-lg font-bold text-foreground mb-2",children:s.title}),n.jsx("p",{className:"text-sm text-muted-foreground leading-relaxed mb-4",children:s.description}),n.jsxs("div",{className:"flex items-center gap-4",children:[n.jsx("span",{className:"px-3 py-1 bg-secondary rounded-lg text-xs font-semibold text-secondary-foreground",children:s.fileType}),n.jsx("span",{className:"text-sm text-muted-foreground font-medium",children:s.size})]})]})]}),n.jsxs(de,{className:"flex w-full sm:w-auto items-center justify-center gap-2 shadow-md",size:"lg",onClick:()=>{be(s)},disabled:B,children:[J===s.fileName?n.jsx(ce,{className:"w-4 h-4 animate-spin"}):n.jsx(se,{className:"w-4 h-4"}),J===s.fileName?"Generating...":"Download"]})]})},s.title)})}),n.jsx(Q.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.4,delay:.4},className:"mt-8 flex justify-center",children:n.jsxs(de,{size:"lg",variant:"outline",className:"flex items-center gap-2 shadow-md hover:shadow-lg",onClick:()=>{ye()},disabled:H.length===0||B,children:[X?n.jsx(ce,{className:"w-5 h-5 animate-spin"}):n.jsx(se,{className:"w-5 h-5"}),X?"Generating Files...":"Download All Files"]})})]})]})}export{qe as default};

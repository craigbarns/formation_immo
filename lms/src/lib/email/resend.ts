import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM = "MonPassFormation <formation@monpassformation.com>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://app.monpassformation.com";

export async function sendWelcomeEmail(email: string, name?: string) {
  if (!resend) return;
  const prenom = name?.split(" ")[0] ?? "là";
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Bienvenue dans ta formation ALUR 2026 🏠",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#070d18;color:#fff;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#0a1628,#0f2040);padding:40px 32px;text-align:center">
          <h1 style="color:#d4af37;font-size:28px;margin:0 0 8px">MonPassFormation</h1>
          <p style="color:#ffffff60;margin:0;font-size:13px;text-transform:uppercase;letter-spacing:2px">Formation Agent Immobilier — Loi ALUR 2026</p>
        </div>
        <div style="padding:40px 32px">
          <h2 style="color:#fff;font-size:22px;margin:0 0 16px">Bienvenue ${prenom} ! 🎉</h2>
          <p style="color:#ffffff80;line-height:1.7">Ta formation est maintenant accessible. Tu as 42h de contenu devant toi : 5 modules, 36 leçons, un coach IA, des simulateurs financiers et un examen certifiant.</p>
          <div style="margin:32px 0;text-align:center">
            <a href="${APP_URL}/formation" style="display:inline-block;background:#d4af37;color:#0a1628;font-weight:900;font-size:14px;text-transform:uppercase;letter-spacing:2px;padding:16px 32px;border-radius:12px;text-decoration:none">
              Commencer la formation →
            </a>
          </div>
          <p style="color:#ffffff40;font-size:13px;line-height:1.6">
            💡 <strong style="color:#ffffff60">Conseil :</strong> commence par le test de positionnement pour que la formation s'adapte à ton niveau.<br><br>
            Si tu as des questions, réponds directement à cet email.
          </p>
        </div>
        <div style="background:#ffffff08;padding:24px 32px;text-align:center">
          <p style="color:#ffffff30;font-size:12px;margin:0">MonPassFormation · <a href="${APP_URL}" style="color:#d4af37;text-decoration:none">app.monpassformation.com</a></p>
        </div>
      </div>
    `,
  });
}

export async function sendModuleCompletionEmail(
  email: string,
  name: string | undefined,
  moduleTitle: string,
  moduleNumber: number,
  xp: number
) {
  if (!resend) return;
  const prenom = name?.split(" ")[0] ?? "là";
  const remaining = 5 - moduleNumber;
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `Module ${moduleNumber}/5 validé — Continue sur ta lancée ! 🏆`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#070d18;color:#fff;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#0a1628,#0f2040);padding:40px 32px;text-align:center">
          <div style="font-size:48px;margin-bottom:12px">🏆</div>
          <h1 style="color:#d4af37;font-size:24px;margin:0">Module ${moduleNumber}/5 validé !</h1>
        </div>
        <div style="padding:40px 32px">
          <h2 style="color:#fff;font-size:20px;margin:0 0 16px">Bravo ${prenom} !</h2>
          <p style="color:#ffffff80;line-height:1.7">Tu viens de terminer le module <strong style="color:#d4af37">${moduleTitle}</strong>. +${xp} XP gagnés.</p>
          ${remaining > 0 ? `
          <p style="color:#ffffff80;line-height:1.7">Il te reste <strong style="color:#fff">${remaining} module${remaining > 1 ? "s" : ""}</strong> avant la certification finale. Ne lâche pas !</p>
          ` : `
          <p style="color:#ffffff80;line-height:1.7">C'était le dernier module ! Tu peux maintenant passer l'<strong style="color:#d4af37">examen de certification</strong>.</p>
          `}
          <div style="margin:32px 0;text-align:center">
            <a href="${APP_URL}/formation" style="display:inline-block;background:#d4af37;color:#0a1628;font-weight:900;font-size:14px;text-transform:uppercase;letter-spacing:2px;padding:16px 32px;border-radius:12px;text-decoration:none">
              ${remaining > 0 ? "Continuer la formation →" : "Passer la certification →"}
            </a>
          </div>
        </div>
        <div style="background:#ffffff08;padding:24px 32px;text-align:center">
          <p style="color:#ffffff30;font-size:12px;margin:0">MonPassFormation · <a href="${APP_URL}" style="color:#d4af37;text-decoration:none">app.monpassformation.com</a></p>
        </div>
      </div>
    `,
  });
}

export async function sendCertificationEmail(email: string, name: string | undefined) {
  if (!resend) return;
  const prenom = name?.split(" ")[0] ?? "là";
  const fullName = name ?? "Apprenant";
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "🎓 Tu es certifié Agent Immobilier ALUR 2026 !",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#070d18;color:#fff;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#1a0f00,#2d1a00);padding:40px 32px;text-align:center;border-bottom:2px solid #d4af37">
          <div style="font-size:56px;margin-bottom:12px">🎓</div>
          <h1 style="color:#d4af37;font-size:26px;margin:0">Félicitations ${prenom} !</h1>
          <p style="color:#ffffff60;margin:8px 0 0;font-size:14px">Tu as obtenu ta certification Loi ALUR 2026</p>
        </div>
        <div style="padding:40px 32px;text-align:center">
          <div style="background:#ffffff08;border:1px solid #d4af3740;border-radius:16px;padding:32px;margin-bottom:32px">
            <p style="color:#ffffff40;font-size:11px;text-transform:uppercase;letter-spacing:3px;margin:0 0 8px">Certifie</p>
            <p style="color:#fff;font-size:22px;font-weight:900;margin:0 0 8px">${fullName}</p>
            <p style="color:#d4af37;font-size:14px;margin:0">Formation Agent Immobilier — 42h — Loi ALUR 2026</p>
          </div>
          <p style="color:#ffffff80;line-height:1.7;text-align:left">Tu as complété les 5 modules et validé l'examen certifiant. Cette formation est reconnue dans le cadre de l'obligation de formation continue des agents immobiliers.</p>
          <div style="margin:32px 0">
            <a href="${APP_URL}/formation/certification" style="display:inline-block;background:#d4af37;color:#0a1628;font-weight:900;font-size:14px;text-transform:uppercase;letter-spacing:2px;padding:16px 32px;border-radius:12px;text-decoration:none">
              Télécharger mon certificat →
            </a>
          </div>
          <p style="color:#ffffff40;font-size:13px">Partage ta réussite sur LinkedIn pour valoriser ta formation professionnelle.</p>
        </div>
        <div style="background:#ffffff08;padding:24px 32px;text-align:center">
          <p style="color:#ffffff30;font-size:12px;margin:0">MonPassFormation · <a href="${APP_URL}" style="color:#d4af37;text-decoration:none">app.monpassformation.com</a></p>
        </div>
      </div>
    `,
  });
}

export async function sendAdminCreatedAccountEmail(
  email: string,
  firstName: string,
  temporaryPassword: string
) {
  if (!resend) {
    console.error("[email] RESEND_API_KEY manquant — email non envoyé");
    return;
  }
  const { data, error } = await resend.emails.send({
    from: FROM,
    to: email,
    subject: "Ton accès à la formation MonPassFormation",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#070d18;color:#fff;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#0a1628,#0f2040);padding:40px 32px;text-align:center">
          <h1 style="color:#d4af37;font-size:28px;margin:0 0 8px">MonPassFormation</h1>
          <p style="color:#ffffff60;margin:0;font-size:13px;text-transform:uppercase;letter-spacing:2px">Formation Agent Immobilier — Loi ALUR 2026</p>
        </div>
        <div style="padding:40px 32px">
          <h2 style="color:#fff;font-size:22px;margin:0 0 16px">Bonjour ${firstName} 👋</h2>
          <p style="color:#ffffff80;line-height:1.7">Ton accès à la formation a été créé. Voici tes identifiants de connexion :</p>

          <div style="background:#ffffff0d;border:1px solid #d4af3740;border-radius:12px;padding:24px;margin:24px 0">
            <p style="margin:0 0 12px;color:#ffffff60;font-size:12px;text-transform:uppercase;letter-spacing:2px">Tes identifiants</p>
            <p style="margin:0 0 8px;color:#fff;font-size:15px"><strong style="color:#d4af37">Email :</strong> ${email}</p>
            <p style="margin:0;color:#fff;font-size:15px"><strong style="color:#d4af37">Mot de passe temporaire :</strong> <span style="font-family:monospace;background:#ffffff15;padding:2px 8px;border-radius:6px">${temporaryPassword}</span></p>
          </div>

          <p style="color:#ffffff80;line-height:1.7;margin:24px 0 8px">Clique sur le bouton ci-dessous pour te connecter directement à ta formation :</p>

          <div style="margin:24px 0 32px;text-align:center">
            <a href="${APP_URL}/login" style="display:inline-block;background:#d4af37;color:#0a1628;font-weight:900;font-size:14px;text-transform:uppercase;letter-spacing:2px;padding:16px 32px;border-radius:12px;text-decoration:none">
              Me connecter à ma formation →
            </a>
          </div>

          <div style="border-top:1px solid #ffffff15;padding-top:20px;margin-top:8px">
            <p style="color:#ffffff60;font-size:13px;line-height:1.7;margin:0 0 12px">
              🔒 Pour changer ton mot de passe, connecte-toi puis va dans <strong style="color:#ffffff80">Mon profil</strong> → <strong style="color:#ffffff80">Changer mon mot de passe</strong>.
            </p>
            <p style="color:#ffffff60;font-size:13px;line-height:1.7;margin:0">
              📞 En cas de difficulté, contacte notre service technique au <a href="tel:0618130727" style="color:#d4af37;text-decoration:none;font-weight:700">06 18 13 07 27</a>.
            </p>
          </div>
        </div>
        <div style="background:#ffffff08;padding:24px 32px;text-align:center">
          <p style="color:#ffffff30;font-size:12px;margin:0">MonPassFormation · <a href="${APP_URL}" style="color:#d4af37;text-decoration:none">app.monpassformation.com</a></p>
        </div>
      </div>
    `,
  });
  if (error) {
    console.error("[email] Erreur Resend sendAdminCreatedAccountEmail:", JSON.stringify(error));
  } else {
    console.log("[email] Email envoyé avec succès, id:", data?.id);
  }
}

export async function sendReminderEmail(email: string, name: string | undefined, daysSince: number) {
  if (!resend) return;
  const prenom = name?.split(" ")[0] ?? "là";
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: `${prenom}, ta formation t'attend 👀`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#070d18;color:#fff;border-radius:16px;overflow:hidden">
        <div style="background:linear-gradient(135deg,#0a1628,#0f2040);padding:40px 32px;text-align:center">
          <div style="font-size:40px;margin-bottom:12px">👀</div>
          <h1 style="color:#fff;font-size:22px;margin:0">Ça fait ${daysSince} jours…</h1>
        </div>
        <div style="padding:40px 32px">
          <p style="color:#ffffff80;line-height:1.7">Hey ${prenom}, tu n'es pas revenu sur ta formation depuis ${daysSince} jours. Les agents qui terminent leur formation le font en maintenant une régularité de <strong style="color:#d4af37">20 min par jour</strong>.</p>
          <p style="color:#ffffff80;line-height:1.7">Là où tu en es, il suffit de reprendre. Ton streak et ta progression sont sauvegardés.</p>
          <div style="margin:32px 0;text-align:center">
            <a href="${APP_URL}/formation" style="display:inline-block;background:#d4af37;color:#0a1628;font-weight:900;font-size:14px;text-transform:uppercase;letter-spacing:2px;padding:16px 32px;border-radius:12px;text-decoration:none">
              Reprendre ma formation →
            </a>
          </div>
        </div>
        <div style="background:#ffffff08;padding:24px 32px;text-align:center">
          <p style="color:#ffffff30;font-size:12px;margin:0">MonPassFormation · <a href="${APP_URL}" style="color:#d4af37;text-decoration:none">app.monpassformation.com</a> · <a href="${APP_URL}/unsubscribe?email=${encodeURIComponent(email)}" style="color:#ffffff30;text-decoration:none">Se désabonner</a></p>
        </div>
      </div>
    `,
  });
}

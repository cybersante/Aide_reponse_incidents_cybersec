//Formulaire aide hameçonnage
//Cellule ACSS - ANS
//version 11/05/2020

function popupBasique(page) {
    window.open(page);
}
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
$(document).ready(function() {
    console.log("ready");
            Survey
                .StylesManager
                .applyTheme("modern");

            var json = {
                title: "Aide à la décision pour traiter un incident lié à un hameçonnage (ACSS/ANS - version 11/05/2020)",
                pages: [{
                    title: "Présenter le contexte de l'incident et les éléments à votre disposition.",
                    questions: [{
                        type: "checkbox",
                        name: "typedetect",
                        title: "Comment avez vous découvert l'incident?",
                        isRequired: true,
                        hasOther: true,
                        choices: [
                            "Mail queue saturée",
							"Votre serveur SMTP sortant est en liste noire",
							"Un organisme exterieur vous a prévenu (ANS, ANSSI, ...)",
							"Vous avez reçu un courriel sur votre abuse@ pour vous indiquer que vous transmettiez du SPAM",
							"Un de vos utilisateurs vous a indiqué avoir transmis ces identifiants",
							"Un de vos utilisateurs vous a transmis le courriel indésirable",
							"Vous avez détecté une activité anormale sur votre webmail",
							"Vous avez vu dans vos quarantaines de mail de nombreux courriels d'hameçonnage récents",
							"Vous avez reçu le courriel indésirable dans votre propre boite"
                        ]
                    },
                    {
							type: "radiogroup",
							name: "comm",
							title: "Avez vous realisé une communication interne pour prévenir vos utilisateurs de la campagne en cours afin de les sensibiliser?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
                        type: "text",
                        inputType: "date",
                        name: "date",
                        title: "Quand votre incident a commencé?",
                        isRequired: true
                    },
					{
							type: "html",
							name: "pb-comm",
							visibleIf: "{comm} = 'Non'",
							title: "Explication",
							html: "<p>Attention: Il est important de communiquer à vos utilisateurs afin qu'ils soient plus vigilants et vous informent en cas de transmission de leurs identifiants...</p>"
					},
					{
							type: "radiogroup",
							name: "inputrecup",
							title: "Avez vous pu récuperer un courriel (avec les entetes) d'hameconnage reçu par vos utilisateurs ?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-recupo",
							visibleIf: "{inputrecup} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, si vous avez besoin d'aide pour l'analyse, vous pouvez le transferer dans un fichier zip avec un mot de passe à cyberveille-support@asipsante.fr.</p>"
					},
					{
							type: "html",
							name: "pb-recup",
							visibleIf: "{inputrecup} = 'Non'",
							title: "Explication",
							html: "<p>Attention: Sans les données présentes dans le courriel d'hameçonnage, il sera difficile de traiter l'incident correctement...</p>"
					},
					{
							type: "radiogroup",
							name: "outputrecup",
							visibleIf: "{typedetect} contains 'Mail queue saturée' or {typedetect} contains 'Votre serveur SMTP sortant est en liste noire' or {typedetect} contains 'Vous avez reçu un courriel sur votre abuse@ pour vous indiquer que vous transmettiez du SPAM' or {typedetect} contains 'Un organisme exterieur vous a prévenu (ANS, ANSSI, ...)'",
							title: "Avez vous pu récuperer un courriel (avec les entetes) transmis par l'attaquant vers l'exterieur suite à votre incident?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-recup-out",
							visibleIf: "{outputrecup} = 'Non'",
							title: "Explication",
							html: "<p>Attention: Sans les données présentes dans les courriels sortants de l'attaquant, il sera difficile de traiter l'incident correctement...</p>"
					},
					{
							type: "html",
							name: "pb-recupo-out",
							visibleIf: "{outputrecup} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, si vous avez besoin d'aide pour l'analyse, vous pouvez le transferer dans un fichier zip avec un mot de passe à cyberveille-support@asipsante.fr.</p>"
					}
					],
				},{
                    title: "Identifier la methode d'hameçonnage, les comptes compromis, et adapter votre réponse. ",
                    questions: [
                    {
							type: "radiogroup",
							name: "idpj",
							title: "La campagne utilise une pièce jointe pour l'hameçonnage ?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-pjm",
							visibleIf: "{idpj} = 'Oui'",
							title: "Explication",
							html: "<p>Attention: selon l'extension vous etes peut etre face à une campagne de malware par email et non pas un simple hameçonnage !</p>"
					},
					{
							type: "radiogroup",
							name: "idpj2",
							title: "La campagne utilise une pièce jointe avec une extension (ou mime-type) qui n'est jamais utilisée dans la réception de vos messages ?",
							visibleIf: "{idpj} = 'Oui'",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-pjo",
							visibleIf: "{idpj2} = 'Oui'",
							title: "Explication",
							html: "<p>Dans ce cas vous pouvez bloquer ce type d'extension/mimetype (privilégier la suppression de la piece jointe avec un message d'explication à l'utilisateur)...</p>"
					},
					{
							type: "html",
							name: "pb-pjn",
							visibleIf: "{idpj2} = 'Non'",
							title: "Explication",
							html: "<p>Dans ce cas vous pouvez essayer d'augmenter le score de spam sur ce type d'extension ou mimetype afin que celui-ci puisse etre 'la goute d'eau qui fait déborder le vase'...</p>"
					},
					{
							type: "radiogroup",
							name: "idurl",
							title: "La campagne utilise une lien web (URL) pour l'hameçonnage ?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "signal-url",
							visibleIf: "{idurl} = 'Oui'",
							title: "Explication",
							html: "<p>Pensez à signaler l'URL sur les sites spécialisés: <a href='https://www.phishtank.com/'>phishtank</a>, <a href='https://www.signal-spam.fr/'>Signal SPAM</a>!</p>"
					},
					{
							type: "radiogroup",
							name: "idproxy",
							title: "Possédez vous un proxy web sortant pour vos utilisateurs ?",
							visibleIf: "{idurl} = 'Oui'",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "radiogroup",
							name: "block-fw",
							title: "Avez vous bloqué l'adresse IP utilisée dans l'URL sur votre firewall ?",
							description: "bloquer toujours l'adresse IP (resolution de l'host) sauf si l'host est un service légitime utilisé par vos utilisateurs alors sans proxy cela est quasi impossible (nous vous recommandons d'installer un proxy).",
							visibleIf: "{idproxy} = 'Non'",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-bfo",
							visibleIf: "{block-fw} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bonne réaction !</p>"
					},
					{
							type: "html",
							name: "pb-bfn",
							visibleIf: "{block-fw} = 'Non'",
							title: "Explication",
							html: "<p>Vous devriez installer un proxy, vous pouvez utiliser la technologie docker pour installer un proxy squid en quelques secondes et placez le de manière transparente (redirection fw des ports 443/80 vers le proxy)!</p>"
					},
					{
							type: "radiogroup",
							name: "block-fw2",
							title: "Avez vous les traces de connexions sortantes vers internet (port 80/443) de vos utilisateurs ?",
							description: "Il s'agit de traces légales qui peuvent etre demandées par la justice, il est important de journaliser ces informations.",
							visibleIf: "{idproxy} = 'Non'",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-bf2o",
							visibleIf: "{block-fw2} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, recherchez les connexions vers l'adresse IP de l'URL et identifiez les utilisateurs !</p>"
					},
					{
                        type: "text",
                        inputType: "number",
                        name: "res-rech-prox",
                        title: "Combien d'identifiants de comptes utilisateurs ont été potentiellement transmis à l'attaquant ?",
                        visibleIf: "{pb-bf2o} = 'Oui'",
                        isRequired: true,
                        validators: [
							{
								type: "numeric",
								minValue: 0,
							}
						]
                    },
                    {
							type: "radiogroup",
							name: "block-compt",
							title: "Avez vous pu désactiver les comptes identifiés ?",
							isRequired: true,
							visibleIf: "{res-rech-prox} > 0",
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-blcpo",
							visibleIf: "{block-compt} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bonne réaction !</p>"
					},
					{
							type: "html",
							name: "pb-blcpn",
							visibleIf: "{block-compt} = 'Non'",
							title: "Explication",
							html: "<p>Realisez la désactivation des comptes au plus vite!!</p>"
					},
					{
							type: "html",
							name: "pb-bf2n",
							visibleIf: "{block-fw2} = 'Non'",
							title: "Explication",
							html: "<p>A défaut d'avoir un proxy web, nous vous invitons à les activer pour la prochaine fois !</p>"
					},
					{
							type: "radiogroup",
							name: "rech-dns",
							title: "Avez vous les logs DNS des requetes de vos utilisateurs?",
							description: "Il est important que le log contienne l'hostname demandée en resolution ainsi que l'adresse IP du client final (l'utilisateur).",
							visibleIf: "{idproxy} = 'Non'",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-bdo",
							visibleIf: "{rech-dns} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, recherchez l'hostname contenu dans l'URL, et identifez les utilisateurs qui ont potentiellement transmis le mot de passe !</p>"
					},
					{
                        type: "text",
                        inputType: "number",
                        name: "res-rech-prox",
                        title: "Combien d'identifiants de comptes utilisateurs ont été potentiellement transmis à l'attaquant ?",
                        visibleIf: "{rech-dns} = 'Oui'",
                        isRequired: true,
                        validators: [
							{
								type: "numeric",
								minValue: 0,
							}
						]
                    },
                    {
							type: "radiogroup",
							name: "block-compt",
							title: "Avez vous pu désactiver les comptes identifiés ?",
							isRequired: true,
							visibleIf: "{res-rech-prox} > 0",
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-blcpo",
							visibleIf: "{block-compt} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bonne réaction !</p>"
					},
					{
							type: "html",
							name: "pb-blcpn",
							visibleIf: "{block-compt} = 'Non'",
							title: "Explication",
							html: "<p>Realisez la désactivation des comptes au plus vite!!</p>"
					},
					{
							type: "html",
							name: "pb-bdn",
							visibleIf: "{rech-dns} = 'Non'",
							title: "Explication",
							html: "<p>Vous devriez installer un proxy, vous pouvez utiliser la technologie docker pour installer un proxy squid en quelques secondes et placez le de manière transparente (redirection fw des ports 443/80 vers le proxy)!</p>"
					},
					{
							type: "radiogroup",
							name: "block-prox",
							title: "Avez vous bloqué cette URL dans le proxy (IP + HOST)?",
							description: "bloquez toujours l'adresse IP (résolution de l'host) ainsi que l'host, voir le domaine si cela n'a pas d'impact. Si l'host est un service légitime utilisé par vos utilisateurs alors bloquez seulement l'URL concernée.",
							visibleIf: "{idproxy} = 'Oui'",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-bpo",
							visibleIf: "{block-prox} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bonne réaction !</p>"
					},
					{
							type: "html",
							name: "pb-bpn",
							visibleIf: "{block-prox} = 'Non'",
							title: "Explication",
							html: "<p>Realisez ce blocage au plus vite!!</p>"
					},
					{
							type: "radiogroup",
							name: "rech-prox",
							title: "Avez vous recherché dans le proxy les traces de connexions vers ces adresses ?",
							visibleIf: "{idproxy} = 'Oui'",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
                        type: "text",
                        inputType: "number",
                        name: "res-rech-prox",
                        title: "Combien d'identifiants de comptes utilisateurs ont été potentiellement transmis à l'attaquant ?",
                        visibleIf: "{rech-prox} = 'Oui'",
                        isRequired: true,
                        validators: [
							{
								type: "numeric",
								minValue: 0,
							}
						]
                    },
                    {
							type: "radiogroup",
							name: "block-compt",
							title: "Avez vous pu désactiver les comptes identifiés ?",
							isRequired: true,
							visibleIf: "{res-rech-prox} > 0",
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-blcpo",
							visibleIf: "{block-compt} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bonne réaction !</p>"
					},
					{
							type: "html",
							name: "pb-blcpn",
							visibleIf: "{block-compt} = 'Non'",
							title: "Explication",
							html: "<p>Realisez la désactivation des comptes au plus vite!!</p>"
					},
					{
							type: "radiogroup",
							name: "idhaus",
							title: "L'URL est elle connue dans les listes noires: https://urlhaus.abuse.ch/browse/ , https://www.phishtank.com/phish_archive.php ?",
							visibleIf: "{idurl} = 'Oui'",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-hauso",
							visibleIf: "{idhaus} = 'Oui'",
							title: "Explication",
							html: "<p>Dans ce cas vous auriez pu potentiellement eviter cet incident en utilisant ces listes noires (vous pouvez utiliser clamav avec 'phishtank.ndb' et https://urlhaus.abuse.ch/api/#clamav).</p>"
					},
					{
							type: "html",
							name: "pb-hausn",
							visibleIf: "{idhaus} = 'Non'",
							title: "Explication",
							html: "<p>Pas de chance! Mais si ce n'est pas déjà le cas, pensez à utiliser les listes noires (vous pouvez utiliser clamav avec 'phishtank.ndb' et https://urlhaus.abuse.ch/api/#clamav).</p><p>De plus, il est toujours interessant et important de partager vos URL malicieuses sur les sites de listes noires afin d'aussi protéger les autres en retour.</p>"
					},
					{
							type: "radiogroup",
							name: "idreply",
							title: "La campagne utilise la réponse au message sur une adresse spécifique (reply-to) pour récupérer les informations ?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "signal-domreply",
							visibleIf: "{idreply} = 'Oui'",
							title: "Explication",
							html: "<p>Pensez à contacter l'abuse du domaine pour signaler l'utilisation de la boite pour activités malicieuses.</p>"
					},
					{
							type: "radiogroup",
							name: "bl-reply",
							title: "Avez vous bloqué cette adresse en sortie?",
							visibleIf: "{idreply} = 'Oui'",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-reo",
							visibleIf: "{bl-reply} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bonne réaction !</p>"
					},
					{
							type: "html",
							name: "pb-ren",
							visibleIf: "{bl-reply} = 'Non'",
							title: "Explication",
							html: "<p>Ne perdez pas de temps, bloquez la !</p>"
					},
					{
							type: "radiogroup",
							name: "bl-reply2",
							title: "Avez vous recherché dans vos logs smtp sortant l'ensemble des utilisateurs ayant répondu ?",
							visibleIf: "{idreply} = 'Oui'",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-re2n",
							visibleIf: "{bl-reply2} = 'Non'",
							title: "Explication",
							html: "<p>Effectuez cette recherche rapidement afin d'identifier les comptes compromis et passer à la suite !</p>"
					},
					{
                        type: "text",
                        inputType: "number",
                        name: "res-rech-prox",
                        title: "Combien d'identifiants de comptes utilisateurs ont été potentiellement transmis à l'attaquant ?",
                        visibleIf: "{idreply} = 'Oui'",
                        isRequired: true,
                        validators: [
							{
								type: "numeric",
								minValue: 0,
							}
						]
                    },
                    {
							type: "radiogroup",
							name: "block-compt",
							title: "Avez vous pu désactiver les comptes identifiés ?",
							isRequired: true,
							visibleIf: "{res-rech-prox} > 0",
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "pb-blcpo",
							visibleIf: "{block-compt} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bonne réaction !</p>"
					},
					{
							type: "html",
							name: "pb-blcpn",
							visibleIf: "{block-compt} = 'Non'",
							title: "Explication",
							html: "<p>Realisez la désactivation des comptes au plus vite !!</p>"
					},
					{
							type: "html",
							name: "comuser",
							visibleIf: "{res-rech-prox} > 0",
							title: "Explication",
							html: "<p>Attention: pensez à recommander à vos utilisateurs ayant transmis leurs identifiants de changer leurs mots de passe sur leurs comptes personnels (gmail, msn, skype, ...) lorsqu'il utilisait le meme que celui transmis !</p>"
					},
					],
				},{
                    title: "Identifier les comptes réellement compromis (connexion de l'attaquant) et adapter vos mesures de réaction.",
                    questions: [
                    {
                        type: "checkbox",
                        name: "services",
                        title: "Qu'elles sont vos services exposés sur internet où les identifiants volés peuvent etre utilisés ?",
                        isRequired: true,
                        hasOther: true,
                        choices: [
                            "Webmail",
							"VPN",
							"RDP"
                        ]
                    },
                    {
							type: "radiogroup",
							name: "cve",
							title: "Avez vous verifié que vos services exposés à internet n'etaient pas vulnérables à des CVE ?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "cveo",
							visibleIf: "{cve} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, car l'attaquant pourrait essayer un autre chemin pour vous compromettre !</p>"
					},
					{
							type: "html",
							name: "cven",
							visibleIf: "{cve} = 'Non'",
							title: "Explication",
							html: "<p>Attention: verifiez que vous etes à jour car il existe de nombreuses vulnérabilités sur les logiciels VPN, webmail, serveurs de messagerie, ... qui pourraient permettre à un attaquant de prendre le controle sur votre SI...</p>"
					},
					{
							type: "radiogroup",
							name: "rwebmail",
							title: "Avez vous effectué une recherche dans vos logs de connexions au webmail ?",
							description: "Vous pouvez utiliser l'API https://github.com/cybersante/Blacklist_tools afin de realiser rapidement cette recherche. Attention, il faut realiser cela pour l'ensemble des comptes et pas seulement ceux identifiés à l'étape précendente (cas du poste nomade n'utilisant pas la connexion proxy/fw).",
							visibleIf: "{services} contains 'Webmail'",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "rwbn",
							visibleIf: "{rwebmail} = 'Non'",
							title: "Explication",
							html: "<p>Attention: il est indispensable de realiser cette étape pour identifier si le compte a été réellement compromis ou non, dans le cas contraire vous pourriez passer à coté de certains comptes compromis (cas des postes nomades n'utilisant pas le proxy/fw, ...).</p>"
					},
					{
                        type: "text",
                        inputType: "number",
                        name: "servpcompro-w",
                        visibleIf: "{rwebmail} = 'Oui'",
                        title: "Combien de comptes utilisateurs ont été compromis sur le webmail ?",
                        isRequired: true,
                        validators: [
							{
								type: "numeric",
								minValue: 0,
							}
						]
                    },
					{
							type: "radiogroup",
							name: "rwebmail2",
							title: "Avez vous désactivé tous les comptes identifés (nouveau(x) compte(s)) ?",
							visibleIf: "{servpcompro-w} > 0",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "rwbo2",
							visibleIf: "{rwebmail2} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bonne réaction.</p>"
					},
					{
							type: "html",
							name: "rwbn2",
							visibleIf: "{rwebmail2} = 'Non'",
							title: "Explication",
							html: "<p>Vous devriez le faire sans attendre !</p>"
					},
					{
							type: "radiogroup",
							name: "rwebmail3",
							title: "Avez vous verifié qu'aucune connexion n'est encore actives sur le webmail pour ces comptes (cas ou l'attaquant était et serait connecté depuis la désactivation du compte)?",
							description: "Vous pouvez voir cela sur votre firewall (table de connexion) ou sur votre serveur frontal avec un netstat.",
							visibleIf: "{servpcompro-w} > 0",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "rwbo3",
							visibleIf: "{rwebmail3} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bonne réaction.</p>"
					},
					{
							type: "html",
							name: "rwbn3",
							visibleIf: "{rwebmail3} = 'Non'",
							title: "Explication",
							html: "<p>Vous devriez le faire sans attendre et deconnecter les attaquants potentiels avec une session encore active !</p>"
					},
					{
							type: "radiogroup",
							name: "rwebmail4",
							title: "Avez vous verifié qu'aucun compte n'avait de persistance ?",
							description: "il existe plusieurs formes de persistance sur une boite mail: script, redirection automatique. L'attaquant met en place un forward par copie à une boite qu'il controle, ce qui lui permet de pouvoir voler de nombreuses informations dont des mots de passe...",
							visibleIf: "{servpcompro-w} > 0",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "rwbo4",
							visibleIf: "{rwebmail4} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bonne réaction.</p>"
					},
					{
							type: "html",
							name: "rwbn4",
							visibleIf: "{rwebmail4} = 'Non'",
							title: "Explication",
							html: "<p>Vous devriez le faire avant de réactiver le compte de l'utilisateur.</p>"
					},
					{
							type: "radiogroup",
							name: "rwebmail5",
							title: "Avez vous identifié avec l'utilisateur l'ensemble des mots de passe qui etaient présents dans sa boite mail ?",
							description: "L'attaquant récupere souvent l'ensemble de la boite mail puis l'analyse à la recherche d'informations interessantes: mots de passe, données sensibles, ...",
							visibleIf: "{servpcompro-w} > 0",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "rwbo5",
							visibleIf: "{rwebmail5} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, faites lui changer ces mots de passe !</p>"
					},
					{
							type: "html",
							name: "rwbn5",
							visibleIf: "{rwebmail5} = 'Non'",
							title: "Explication",
							html: "<p>Vous devriez le faire avant de réactiver le compte de l'utilisateur.</p>"
					},
					{
							type: "radiogroup",
							name: "rvpn",
							title: "Avez vous effectué une recherche dans vos logs de connexion au VPN ?",
							description: "Vous pouvez utiliser l'API https://github.com/cybersante/Blacklist_tools afin de realiser cette recherche rapidement. Attention, il faut le faire pour l'ensemble des comptes et pas seulement ceux identifiés à l'étape précendente (cas du poste nomade n'utilisant pas la connexion proxy/fw).",
							visibleIf: "{services} contains 'VPN'",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "rvpnn",
							visibleIf: "{rvpn} = 'Non'",
							title: "Explication",
							html: "<p>Attention: il est indispensable de realiser cette étape pour identifier si le compte a été réellement compromis ou non. Dans le cas contraire, vous pourriez passer à coté de certains comptes compromis (cas des postes nomades n'utilisant pas le proxy/fw, ...).</p>"
					},
					{
                        type: "text",
                        inputType: "number",
                        name: "servpcompro-v",
                        title: "Combien de compte utilisateur ont été compromis sur le VPN ?",
                        isRequired: true,
                        visibleIf: "{rvpn} = 'Oui'",
                        validators: [
							{
								type: "numeric",
								minValue: 0,
							}
						]
                    },
					{
							type: "radiogroup",
							name: "rvpn2",
							title: "Avez vous déconnecté votre service VPN d'internet ?",
							visibleIf: "{servpcompro-v} > 0",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "rvpno2",
							visibleIf: "{rvpn2} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bonne réaction.</p>"
					},
					{
							type: "html",
							name: "rvpnn2",
							visibleIf: "{rvpn2} = 'Non'",
							title: "Explication",
							html: "<p>Vous devriez le faire sans attendre !</p>"
					},
					{
							type: "radiogroup",
							name: "rvpn4",
							title: "Avez vous identifié les adresses IP données à l'attaquant sur votre reseau local ainsi que les horaires ?",
							visibleIf: "{servpcompro-v} > 0",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "rvpno4",
							visibleIf: "{rvpn4} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, maintenant il va falloir rechercher l'ensemble de ces adresses dans les logs de votre SI (potentiellement en RDP mais pas forcement), pour se faire il est préférable d'avoir centralisé l'ensemble de vos logs ou de possèder un outil du type OSquery, sinon bon courage!</p><p>Une investigation doit etre menée et nous sortons du cadre de la seule gestion de l'hameçonnage.</p>"
					},
					{
							type: "html",
							name: "rvpnn4",
							visibleIf: "{rvpn4} = 'Non'",
							title: "Explication",
							html: "<p>Vous devez identifier ces adresses avec les heures afin d'identifier les actions qui ont été menées sur votre SI!</p><p>Un fois realisé, vous devrez rechercher l'ensemble de ces adresses dans les logs de votre SI (potentiellement en RDP mais pas forcement), pour se faire il est préférable d'avoir centralisé l'ensemble de vos logs ou de possèder un outil du type OSquery, sinon bon courage !</p><p>Une investigation doit etre menée et nous sortons du cadre de la seule gestion de l'hameçonnage.</p>"
					},
					{
							type: "radiogroup",
							name: "rrdp",
							title: "Avez vous effectué une recherche dans vos logs de connexion au RDP (event id 4624 et 4634 et )?",
							description: "Utilisez les events windows id: 4624 et 4634, ainsi que les clés de registre: 'HKEY_CURRENT_USER\Software\Microsoft\Terminal Server Client\Default' & 'HKEY_CURRENT_USER\Software\Microsoft\Terminal Server Client\Default', attention l'attaquant a pu tout effacer, alors il est préférable d'avoir centralisé vos logs !",
							visibleIf: "{services} contains 'RDP'",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "rrdpo",
							visibleIf: "{rrdp} = 'Oui'",
							title: "Explication",
							html: "<p>Si vous n'avez plus de traces car l'attaquant a tout effacé et que vous n'avez pas centralisé vos logs, dans ce cas, déconnectez votre RDP d'internet rapidement!!!</p>"
					},
					{
							type: "html",
							name: "rrdpn",
							visibleIf: "{rrdp} = 'Non'",
							title: "Explication",
							html: "<p>Attention: il est indispensable de realiser cette étape pour identifier si le compte a été réellement compromis ou non, dans le cas contraire vous pourriez passer à coté de certains comptes compromis (cas des postes nomades n'utilisant pas le proxy/fw, ...).</p><p>A moins que vous n'avez plus de traces car l'attaquant a tout effacé et que vous n'avez pas centralisé vos logs?! Dans ce cas déconnectez votre RDP d'internet rapidement!!!</p>"
					},
					{
                        type: "text",
                        inputType: "number",
                        name: "servpcompro-r",
                        title: "Combien de compte utilisateur ont été compromis sur le RDP?",
                        isRequired: true,
                        visibleIf: "{rrdp} = 'Oui'",
                        validators: [
							{
								type: "numeric",
								minValue: 0,
							}
						]
                    },
					{
							type: "radiogroup",
							name: "rrdp2",
							title: "Avez vous déconnecté votre RDP d'internet?",
							visibleIf: "{servpcompro-r} > 0",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "rrdpo2",
							visibleIf: "{rrdp2} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bonne réaction. Maintenant il va falloir commencer une investigation qui sort du cadre de la seule gestion de l'hameçonnage !</p>"
					},
					{
							type: "html",
							name: "rrdpn2",
							visibleIf: "{rrdp2} = 'Non'",
							title: "Explication",
							html: "<p>Vous devriez le faire sans attendre! Maintenant il va falloir commencer une investigation qui sort du cadre de la seule gestion de l'hameçonnage !</p>"
					},
					{
							type: "radiogroup",
							name: "rother",
							title: "Avez vous effectué une recherche dans vos logs de connexion à votre service?",
							description: "Vous pouvez utiliser l'API https://github.com/cybersante/Blacklist_tools afin de realiser cette recherche rapidement. Attention, il faut realiser cela pour l'ensemble des comptes et pas seulement ceux identifiés à l'étape précédente (cas du poste nomade n'utilisant pas la connexion proxy/fw).",
							visibleIf: "{services} contains 'Other'",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "rothern",
							visibleIf: "{rother} = 'Non'",
							title: "Explication",
							html: "<p>Selon la criticité de votre service, vous devriez le faire.</p>"
					},
					{
                        type: "text",
                        inputType: "number",
                        name: "servpcompro-o",
                        title: "Combien de compte utilisateur ont été compromis sur le service?",
                        isRequired: true,
                        visibleIf: "{rother} = 'Oui'",
                        validators: [
							{
								type: "numeric",
								minValue: 0,
							}
						]
                    },
					{
							type: "radiogroup",
							name: "rother2",
							title: "Avez vous déconnecté votre service d'internet (si critique) ou désactivé les comptes compromis?",
							visibleIf: "{servpcompro-o} > 0",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "rothero2",
							visibleIf: "{rother2} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bonne reaction. Maintenant à vous d'investiguer selon le contexte de votre service pour identifier l'impact (vol, ...)</p>"
					},
					{
							type: "html",
							name: "rothern2",
							visibleIf: "{rother2} = 'Non'",
							title: "Explication",
							html: "<p>Vous devriez le faire sans attendre! Maintenant à vous d'investiguer selon le contexte de votre service pour identifier l'impact (vol, ...)</p>"
					},
					{
							type: "html",
							name: "ioc",
							title: "Explication",
							html: "<p>Vous pouvez nous transmettre les adresses IP des attaquants que vous avez identifié afin d'ameliorer notre base d'adresses permettant la détection.</p>"
					}
					],
				},{
                    title: "Analyser les messages indésirables de l'attaquant.",
                    questions: [ 
					{
							type: "radiogroup",
							name: "outputrecup",
							visibleIf: "{typedetect} contains 'Mail queue saturée' or {typedetect} contains 'Votre serveur SMTP sortant est en liste noire' or {typedetect} contains 'Vous avez reçu un courriel sur votre abuse@ pour vous indiquer que vous transmettiez du SPAM' or {typedetect} contains 'Un organisme exterieur vous a prévenu (ANS, ANSSI, ...)'",
							title: "Avez vous pu récuperer un courriel (avec les entetes) transmis par l'attaquant vers l'exterieur suite à votre incident?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "radiogroup",
							name: "outputrecup2",
							visibleIf: "{outputrecup} = 'Oui'",
							title: "Avez vous pu analyser le fichier?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "outputrecup2n",
							visibleIf: "{outputrecup2} = 'Non'",
							title: "Explication",
							html: "<p>Vous pouvez nous le transferer pour analyse si vous le souhaitez: cyberveille-support@asipsante.fr.</p>"
					},
					{
							type: "radiogroup",
							name: "outputrecup3",
							visibleIf: "{outputrecup} = 'Oui'",
							title: "Le 'from' utilise un domaine différent du votre?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "outputrecup3n",
							visibleIf: "{outputrecup3} = 'Oui'",
							title: "Explication",
							html: "<p>Vous devirez mettre en place une politique qui interdit l'envoi de mail avec un domaine different du votre. Cette particularité vous permettra de supprimer rapidement les messages indesirables présents dans la queue smtp sortante.</p>"
					},
					{
							type: "radiogroup",
							name: "outputrecup4",
							visibleIf: "{outputrecup} = 'Oui'",
							title: "Avez vous pu identifier un élément permettant de supprimer les messages illegitimes dans la file d'attente du smtp sortant?",
							description: "Vous pouvez utiliser le from, le sujet, le reply, un lien dans le mail, ...",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "outputrecup4o",
							visibleIf: "{outputrecup4} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait ! Maintenant vous pouvez regarder si votre serveur smtp a été mis en liste noire sur: https://www.dnsbl.info/dnsbl-database-check.php . Il faut le déblacklister le cas échéant.</p>"
					},
					{
							type: "html",
							name: "outputrecup4n",
							visibleIf: "{outputrecup4} = 'Non'",
							title: "Explication",
							html: "<p>Il faut supprimer la file d'attente avant de regarder si votre serveur smtp a été mis en liste noire sur: https://www.dnsbl.info/dnsbl-database-check.php . Ensuite il faut le déblacklister le cas échéant.</p>"
					},
					],
				},{
                    title: "Bloquer la campagne et mettre en place des mesures de prévention.",
                    questions: [ 
					{
							type: "radiogroup",
							name: "inputrecup",
							title: "Avez vous pu récuperer un courriel (avec les entetes) d'hameconnage reçu par vos utilisateurs ?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "radiogroup",
							name: "inputrecup2",
							visibleIf: "{inputrecup} = 'Oui'",
							title: "Avez vous pu analyser le fichier ?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "inputrecup2n",
							visibleIf: "{outputrecup2} = 'Non'",
							title: "Explication",
							html: "<p>Vous pouvez nous le transferer pour analyse si vous le souhaitez: cyberveille-support@asipsante.fr.</p>"
					},
					{
							type: "radiogroup",
							name: "inputrecup3",
							visibleIf: "{inputrecup} = 'Oui'",
							title: "La campagne utilise plusieurs adresses expéditrices différentes (from) ?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "radiogroup",
							name: "inputrecup4",
							visibleIf: "{inputrecup3} = 'Oui'",
							title: "Le domaine utilisé dans le FROM a -t-il un enregistrement SPF et si oui le serveur emetteur en fait il partie ?",
							description: "vous pouvez utilisez le site https://www.dmarcanalyzer.com/fr/spf-4/checker/ pour verifier le SPF",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "inputrecup4o",
							visibleIf: "{inputrecup4} = 'Oui'",
							title: "Explication",
							html: "<p>Ok, on va trouver un autre moyen alors!</p>"
					},
					{
							type: "html",
							name: "inputrecup4n",
							visibleIf: "{inputrecup4} = 'Non'",
							title: "Explication",
							html: "<p>Parfait, il suffit d'activer la verification SPF sur votre serveur smtp entrant (MX). Vous pouvez dissocier l'etat d'erreur SPF: hard==discard & soft==modification du sujet pour indiquer risque de phishing et monter le score spam</p>"
					},
					{
							type: "html",
							name: "inputrecup3n",
							visibleIf: "{inputrecup3} = 'Non'",
							title: "Explication",
							html: "<p>Vous pouvez bloquer la campagne avec une règle d'exclusion sur cette adresse (privilégiez l'action discard pour ne pas informer l'attaquant).</p>"
					},
					{
							type: "radiogroup",
							name: "inputrecup5",
							visibleIf: "{idurl} = 'Oui'",
							title: "La campagne utilise une URL ou un domaine toujours identique que vous pouvez bloquer car non légitime ?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "inputrecup5o",
							visibleIf: "{inputrecup5} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, attention à ne pas bloquer des courriels légitimes qui contiennent le nom du domaine dans le corp du message...</p>"
					},
					{
							type: "radiogroup",
							name: "inputrecup6",
							visibleIf: "{inputrecup} = 'Oui'",
							title: "La campagne utilise-t-elle toujours le meme serveur smtp d'envoi ?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "inputrecup6o",
							visibleIf: "{inputrecup6} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bloquez le et regarder s'il etait present dans une liste noire: https://www.dnsbl.info/dnsbl-database-check.php . Si c'est le cas vous pouvez l'ajouter dans votre configuration DNSBL!</p>"
					},
					{
							type: "html",
							name: "inputrecup6n",
							visibleIf: "{inputrecup6} = 'Non'",
							title: "Explication",
							html: "<p>Ok, verifiez si certaines adresses sont connues dans les DNSBL (https://www.dnsbl.info/dnsbl-database-check.php). Si c'est le cas configurez les DNSBL (attention il faut faire une surveillance particulière pour les DNSBL peu connus..)</p>"
					},
					{
							type: "radiogroup",
							name: "inputrecup7",
							visibleIf: "{idurl} = 'Oui'",
							title: "La campagne utilise une entete particulière (useragent, xmailer, originate-ip, message-id ...) ?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "inputrecup7o",
							visibleIf: "{inputrecup7} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, bloquez cet élément atypique (préférez l'action discard pour ne pas alerter votre attaquant)</p>"
					},
					{
							type: "radiogroup",
							name: "inputrecup7",
							visibleIf: "{idurl} = 'Oui'",
							title: "La campagne utilise des mots particuliers ?",
							isRequired: true,
							choices: [
								"Oui", "Non"
							],
					},
					{
							type: "html",
							name: "inputrecup7o",
							visibleIf: "{inputrecup7} = 'Oui'",
							title: "Explication",
							html: "<p>Parfait, créez une règle de spam afin d'augmenter le score spam sur les mots clés...</p>"
					},
					{
							type: "html",
							name: "signal-domreply",
							visibleIf: "{inputrecup} = 'Oui'",
							title: "Explication",
							html: "<p>Pensez à contacter l'abuse du domaine qui a transmis le courriel (domaine 'from', domaine smtp, ...) afin de l'avertir sur l'utilisation malicieuse de son service de messagerie.</p>"
					}
				],
			},
			
			],
                "completedHtml": "<h1>Merci.</h1>"

            };

            window.survey = new Survey.Model(json);

            survey
                .onComplete
                .add(function(result) {
                    document
                        .querySelector('#surveyResult')
                        .textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
                    var pdfWidth = survey.pdfWidth || 210;
                    var pdfHeight = survey.pdfHeight || 297;
                    saveSurveyToPdf("surveyResult.pdf", survey, pdfWidth, pdfHeight, result.data);
                });

            survey.showProgressBar = 'bottom';
            $("#surveyElement").Survey({
                model: survey
            });

            function saveSurveyToPdf(filename, surveyModel, pdfWidth, pdfHeight, data) {
                var options = {
                    fontSize: 14,
                    margins: {
                        left: 10,
                        right: 10,
                        top: 10,
                        bot: 10
                    },
                    format: [pdfWidth, pdfHeight]
                };
                var surveyPDF = new SurveyPDF.SurveyPDF(json, options);
                surveyPDF.data = data;
                surveyPDF.haveCommercialLicense = true;
                surveyPDF.save(filename);
            }

    console.log("sent");
});

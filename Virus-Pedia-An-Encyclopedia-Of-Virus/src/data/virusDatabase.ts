export interface VirusInfo {
  name: string;
  type: 'Trojan' | 'Ransomware' | 'Worm' | 'Rootkit' | 'Spyware' | 'Adware' | 'Botnet' | 'Keylogger' | 'Backdoor' | 'Virus';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
  introduction: string;
  symptoms: string[];
  mitigation: string[];
  prevention: string[];
  affectedSystems: string[];
  discoveryDate: string;
  aliases: string[];
  technicalDetails: string;
  references: string[];
}

export const virusDatabase: VirusInfo[] = [
  {
    name: "WannaCry",
    type: "Ransomware",
    severity: "Critical",
    description: "WannaCry is a ransomware cryptoworm that targets computers running Microsoft Windows by encrypting data and demanding ransom payments in Bitcoin.",
    introduction: "WannaCry spreads through the EternalBlue exploit, which targets a vulnerability in Microsoft's Server Message Block (SMB) protocol. It was initially developed by the NSA and later leaked by the Shadow Brokers hacking group.",
    symptoms: [
      "Files encrypted with .wncry extension",
      "Ransom note displayed on desktop",
      "System performance degradation",
      "Network scanning activity",
      "Inability to access personal files"
    ],
    mitigation: [
      "Isolate infected systems from network immediately",
      "Use Shadow Volumes to recover files if available",
      "Apply Windows security update MS17-010",
      "Use decryption tools if available",
      "Restore from clean backups"
    ],
    prevention: [
      "Keep Windows systems updated with latest patches",
      "Disable SMBv1 protocol",
      "Use endpoint protection with behavioral analysis",
      "Implement network segmentation",
      "Regular backup strategy with offline backups",
      "Employee education on phishing emails"
    ],
    affectedSystems: ["Windows XP", "Windows Vista", "Windows 7", "Windows 8", "Windows 10", "Windows Server 2003", "Windows Server 2008", "Windows Server 2012"],
    discoveryDate: "2017-05-12",
    aliases: ["WCry", "WanaCrypt0r", "Wana Decrypt0r"],
    technicalDetails: "Uses AES-128 encryption for files and RSA-2048 for the AES key. Spreads via SMB vulnerability CVE-2017-0144. Contains a kill switch domain that can halt propagation.",
    references: [
      "CVE-2017-0144",
      "MS17-010 Security Update",
      "MITRE ATT&CK: T1486"
    ]
  },
  {
    name: "Emotet",
    type: "Trojan",
    severity: "High",
    description: "Emotet is a banking trojan that has evolved into a sophisticated malware-as-a-service operation, serving as a loader for other malware families.",
    introduction: "Originally discovered in 2014 as a banking trojan, Emotet evolved into a modular malware platform. It primarily spreads through malicious email attachments, often using social engineering techniques and infected Word documents with macros.",
    symptoms: [
      "Suspicious network traffic",
      "Slow system performance",
      "Unexpected file modifications",
      "Unauthorized email sending",
      "Process injection activities"
    ],
    mitigation: [
      "Block C2 communication at network level",
      "Quarantine infected systems",
      "Run full system antivirus scan",
      "Check for credential compromise",
      "Monitor for lateral movement"
    ],
    prevention: [
      "Email security gateways with attachment scanning",
      "Disable macros in Office applications",
      "User awareness training on phishing",
      "Network monitoring and segmentation",
      "Endpoint detection and response (EDR)",
      "Regular password changes"
    ],
    affectedSystems: ["Windows 7", "Windows 8", "Windows 10", "Windows Server 2008", "Windows Server 2012", "Windows Server 2016"],
    discoveryDate: "2014-06-01",
    aliases: ["Heodo", "Geodo"],
    technicalDetails: "Uses polymorphic packing, multiple C2 servers, and modular architecture. Employs process hollowing and PowerShell for persistence.",
    references: [
      "MITRE ATT&CK: T1566.001",
      "US-CERT Alert TA18-201A"
    ]
  },
  {
    name: "Locky",
    type: "Ransomware",
    severity: "Critical",
    description: "Locky is a ransomware family that encrypts files and demands Bitcoin payment for decryption keys.",
    introduction: "Locky spreads primarily through malicious email attachments containing Word documents with malicious macros. When enabled, the macros download and execute the Locky payload.",
    symptoms: [
      "Files encrypted with .locky extension",
      "Desktop wallpaper changed to ransom note",
      "HTML ransom notes in encrypted folders",
      "Inability to open personal files",
      "System slowdown during encryption"
    ],
    mitigation: [
      "Disconnect from network immediately",
      "Preserve system state for investigation",
      "Check backup integrity",
      "Use available decryption tools if any",
      "Report to law enforcement"
    ],
    prevention: [
      "Disable macros in Office applications",
      "Email filtering and scanning",
      "Regular system backups",
      "User security awareness training",
      "Network segmentation",
      "Endpoint protection with behavioral analysis"
    ],
    affectedSystems: ["Windows XP", "Windows 7", "Windows 8", "Windows 10", "Windows Server"],
    discoveryDate: "2016-02-16",
    aliases: ["Locky Ransomware"],
    technicalDetails: "Uses AES encryption, communicates with C2 servers via Tor, and targets specific file types including documents, images, and databases.",
    references: [
      "MITRE ATT&CK: T1486",
      "FBI Flash Alert"
    ]
  },
  {
    name: "TrickBot",
    type: "Trojan",
    severity: "High",
    description: "TrickBot is a banking trojan and malware framework that steals credentials and delivers additional payloads.",
    introduction: "TrickBot spreads through malicious email campaigns, exploit kits, and other malware like Emotet. It operates as a modular framework capable of credential harvesting, network reconnaissance, and payload delivery.",
    symptoms: [
      "Unusual banking transaction alerts",
      "Browser behavior changes",
      "Network reconnaissance activity",
      "Credential theft attempts",
      "System performance degradation"
    ],
    mitigation: [
      "Change all banking passwords immediately",
      "Monitor financial accounts closely",
      "Run comprehensive malware scan",
      "Check for lateral movement",
      "Block malicious network traffic"
    ],
    prevention: [
      "Use multi-factor authentication",
      "Keep browsers updated",
      "Deploy email security solutions",
      "Network monitoring and segmentation",
      "Regular security awareness training",
      "Endpoint detection and response"
    ],
    affectedSystems: ["Windows 7", "Windows 8", "Windows 10", "Windows Server"],
    discoveryDate: "2016-10-01",
    aliases: ["TrickLoader"],
    technicalDetails: "Modular architecture with plugins for web injection, credential theft, and network propagation. Uses encrypted communication channels.",
    references: [
      "MITRE ATT&CK: T1555",
      "CISA Alert AA20-266A"
    ]
  },
  {
    name: "Petya",
    type: "Ransomware",
    severity: "Critical",
    description: "Petya is ransomware that encrypts the Master File Table (MFT) and Master Boot Record (MBR), making the entire drive inaccessible.",
    introduction: "Petya spreads through email attachments and network shares. Unlike typical ransomware, it overwrites the MBR and encrypts the MFT, rendering the entire system unusable.",
    symptoms: [
      "System fails to boot normally",
      "Red skull displayed on screen",
      "MBR corruption",
      "Inaccessible file system",
      "Boot process hijacked"
    ],
    mitigation: [
      "Do not reboot infected systems",
      "Create disk image for analysis",
      "Boot from external media",
      "Use specialized recovery tools",
      "Restore from system backups"
    ],
    prevention: [
      "Regular system backups with offline storage",
      "Email attachment scanning",
      "Network access controls",
      "User education on suspicious emails",
      "System hardening measures",
      "Boot protection mechanisms"
    ],
    affectedSystems: ["Windows XP", "Windows 7", "Windows 8", "Windows 10"],
    discoveryDate: "2016-03-24",
    aliases: ["Red Petya", "GoldenEye"],
    technicalDetails: "Overwrites MBR with malicious code, encrypts MFT using Salsa20, and displays ransom demand during boot process.",
    references: [
      "CVE-2017-0199",
      "MITRE ATT&CK: T1486"
    ]
  },
  {
    name: "Mirai",
    type: "Botnet",
    severity: "High",
    description: "Mirai is botnet malware that targets IoT devices with weak or default credentials to create massive botnets for DDoS attacks.",
    introduction: "Mirai spreads by scanning for IoT devices using Telnet with default or weak credentials. Once infected, devices become part of a botnet used for distributed denial-of-service attacks.",
    symptoms: [
      "Increased network traffic from IoT devices",
      "Slow internet performance",
      "Unauthorized network connections",
      "Device responsiveness issues",
      "Unusual data usage patterns"
    ],
    mitigation: [
      "Reset infected devices to factory defaults",
      "Change default credentials immediately",
      "Update device firmware",
      "Monitor network traffic",
      "Isolate infected devices"
    ],
    prevention: [
      "Change default passwords on all IoT devices",
      "Regular firmware updates",
      "Network segmentation for IoT devices",
      "Disable unnecessary services",
      "Monitor network for suspicious activity",
      "Use strong authentication methods"
    ],
    affectedSystems: ["IoT Devices", "Routers", "IP Cameras", "DVRs", "Smart Home Devices"],
    discoveryDate: "2016-08-01",
    aliases: ["Mirai Botnet"],
    technicalDetails: "Uses Telnet brute force attacks with dictionary of default credentials. Creates IRC-controlled botnet for DDoS attacks.",
    references: [
      "MITRE ATT&CK: T1110",
      "US-CERT Alert TA16-288A"
    ]
  },
  {
    name: "CryptoLocker",
    type: "Ransomware",
    severity: "Critical",
    description: "CryptoLocker was one of the first major ransomware families, encrypting user files and demanding Bitcoin payments.",
    introduction: "CryptoLocker spreads through email attachments and infected websites. It was one of the first ransomware variants to use strong encryption and Bitcoin payments.",
    symptoms: [
      "Files encrypted with .encrypted extension",
      "Ransom payment window displayed",
      "Countdown timer for payment",
      "Inability to access personal files",
      "Desktop wallpaper changed"
    ],
    mitigation: [
      "Isolate infected system immediately",
      "Do not pay ransom",
      "Check for available decryption tools",
      "Restore from clean backups",
      "Report to authorities"
    ],
    prevention: [
      "Regular automated backups",
      "Email attachment filtering",
      "User security training",
      "Network segmentation",
      "Endpoint protection",
      "System updates and patching"
    ],
    affectedSystems: ["Windows XP", "Windows Vista", "Windows 7", "Windows 8"],
    discoveryDate: "2013-09-05",
    aliases: ["CryptoLocker Ransomware"],
    technicalDetails: "Uses RSA-2048 encryption, communicates via peer-to-peer network, and demands Bitcoin payment within 72 hours.",
    references: [
      "MITRE ATT&CK: T1486",
      "Operation Tovar"
    ]
  },
  {
    name: "Sality",
    type: "Virus",
    severity: "High",
    description: "Sality is a polymorphic file infector virus that spreads through executable files and creates a peer-to-peer botnet.",
    introduction: "Sality infects executable files by appending its code to them. It spreads through infected files shared via removable media, network shares, and P2P networks.",
    symptoms: [
      "Executable files grow in size",
      "Antivirus software disabled",
      "System instability",
      "Slow system performance",
      "Network communication to unknown hosts"
    ],
    mitigation: [
      "Boot from clean external media",
      "Use specialized removal tools",
      "Rebuild infected systems",
      "Restore files from clean backups",
      "Update antivirus signatures"
    ],
    prevention: [
      "Keep antivirus software updated",
      "Avoid executing unknown files",
      "Disable autorun on removable media",
      "Use software restriction policies",
      "Regular system scans",
      "Network monitoring"
    ],
    affectedSystems: ["Windows XP", "Windows Vista", "Windows 7", "Windows 8", "Windows 10"],
    discoveryDate: "2003-07-01",
    aliases: ["Win32.Sality", "Sality.P"],
    technicalDetails: "Polymorphic engine changes its code signature, infects .exe and .dll files, creates P2P botnet for additional payload distribution.",
    references: [
      "MITRE ATT&CK: T1055",
      "Virus Bulletin Analysis"
    ]
  },
  {
    name: "Mydoom",
    type: "Worm",
    severity: "High",
    description: "Mydoom is a mass-mailing worm that spreads via email and creates backdoors for remote access.",
    introduction: "Mydoom spreads through email attachments that appear to be error messages. It was designed to launch DDoS attacks against specific targets and create backdoors.",
    symptoms: [
      "Mass email sending",
      "Network performance degradation",
      "Unexpected file modifications",
      "System resource consumption",
      "Backdoor network connections"
    ],
    mitigation: [
      "Block malicious network traffic",
      "Remove infected email attachments",
      "Update antivirus definitions",
      "Patch system vulnerabilities",
      "Monitor network connections"
    ],
    prevention: [
      "Email filtering and scanning",
      "User education on email threats",
      "Keep systems updated",
      "Use firewall protection",
      "Disable unnecessary services",
      "Regular security assessments"
    ],
    affectedSystems: ["Windows 95", "Windows 98", "Windows ME", "Windows NT", "Windows 2000", "Windows XP"],
    discoveryDate: "2004-01-26",
    aliases: ["W32.Mydoom", "Novarg"],
    technicalDetails: "Self-replicating via email, searches for email addresses in infected system, creates backdoor on TCP port 3127.",
    references: [
      "MITRE ATT&CK: T1566.001",
      "CERT Advisory CA-2004-02"
    ]
  },
  {
    name: "BadRabbit",
    type: "Ransomware",
    severity: "High",
    description: "BadRabbit is ransomware that spreads through fake Adobe Flash updates and encrypts files demanding Bitcoin payment.",
    introduction: "BadRabbit spreads through compromised websites displaying fake Adobe Flash update notifications. It uses legitimate Windows tools for lateral movement.",
    symptoms: [
      "Files encrypted with no specific extension",
      "Ransom note displayed on desktop",
      "System boot process affected",
      "Network share encryption",
      "Administrative tool misuse"
    ],
    mitigation: [
      "Isolate infected systems",
      "Block lateral movement",
      "Use system restore points",
      "Apply security patches",
      "Monitor for credential theft"
    ],
    prevention: [
      "Keep software updated",
      "Verify software updates authenticity",
      "Use application whitelisting",
      "Network segmentation",
      "Privileged access management",
      "Backup and recovery planning"
    ],
    affectedSystems: ["Windows 7", "Windows 8", "Windows 10", "Windows Server"],
    discoveryDate: "2017-10-24",
    aliases: ["Bad Rabbit"],
    technicalDetails: "Uses DiskCryptor for encryption, spreads via SMB with harvested credentials, mimics legitimate Windows utilities.",
    references: [
      "MITRE ATT&CK: T1486",
      "NCSC Alert"
    ]
  },
  {
    name: "GandCrab",
    type: "Ransomware",
    severity: "Critical",
    description: "GandCrab is a ransomware-as-a-service (RaaS) operation that evolved through multiple versions with advanced evasion techniques.",
    introduction: "GandCrab spreads through exploit kits, malicious email attachments, and RDP brute force attacks. It operates as a service with affiliates distributing the malware.",
    symptoms: [
      "Files encrypted with random extensions",
      "GDCB ransom notes created",
      "Desktop wallpaper changed",
      "System files encrypted",
      "Payment portal accessed via Tor"
    ],
    mitigation: [
      "Isolate affected systems immediately",
      "Preserve forensic evidence",
      "Check for available decryptors",
      "Restore from offline backups",
      "Coordinate with law enforcement"
    ],
    prevention: [
      "Regular backup verification",
      "Patch management program",
      "Email security solutions",
      "RDP security hardening",
      "Network monitoring",
      "User awareness training"
    ],
    affectedSystems: ["Windows 7", "Windows 8", "Windows 10", "Windows Server"],
    discoveryDate: "2018-01-28",
    aliases: ["GandCrab Ransomware"],
    technicalDetails: "Uses Salsa20 encryption, communicates via Tor, implements anti-analysis techniques, and features affiliate program.",
    references: [
      "MITRE ATT&CK: T1486",
      "No More Ransom Decryptor"
    ]
  },
  {
    name: "Zeus Variants",
    type: "Trojan",
    severity: "High",
    description: "Zeus family includes numerous variants targeting banking credentials and financial information through web injection attacks.",
    introduction: "Zeus variants spread through various methods including email, drive-by downloads, and other malware. Each variant targets specific banking and financial services.",
    symptoms: [
      "Unauthorized banking transactions",
      "Browser injection attacks",
      "Keylogger activity",
      "Credential harvesting",
      "Fake banking pages displayed"
    ],
    mitigation: [
      "Change all banking credentials",
      "Monitor financial accounts",
      "Remove browser extensions",
      "Clean browser profiles",
      "Use out-of-band verification"
    ],
    prevention: [
      "Use dedicated banking devices",
      "Multi-factor authentication",
      "Transaction monitoring",
      "Browser security hardening",
      "Regular security updates",
      "Financial fraud monitoring"
    ],
    affectedSystems: ["Windows XP", "Windows Vista", "Windows 7", "Windows 8", "Windows 10"],
    discoveryDate: "2007-07-01",
    aliases: ["Zbot", "Zeus-P2P", "GameOver Zeus", "Ice IX"],
    technicalDetails: "Web injection framework, keylogging capabilities, form grabbing, cryptocurrency theft modules, P2P communication.",
    references: [
      "MITRE ATT&CK: T1555.003",
      "FBI Operation Tovar"
    ]
  },
  {
    name: "NotPetya",
    type: "Ransomware",
    severity: "Critical",
    description: "NotPetya is destructive malware that spreads like Petya but is designed to destroy data rather than enable recovery.",
    introduction: "NotPetya spreads through compromised software updates and network propagation. Unlike typical ransomware, it's designed for destruction rather than profit.",
    symptoms: [
      "System boot failure",
      "MBR corruption",
      "Network-wide infection",
      "Data destruction",
      "Fake ransom screen"
    ],
    mitigation: [
      "Isolate infected networks immediately",
      "Do not attempt payment",
      "Focus on containment",
      "Restore from backups",
      "Rebuild affected systems"
    ],
    prevention: [
      "Secure software supply chain",
      "Network segmentation",
      "Patch management",
      "Backup and recovery planning",
      "Incident response procedures",
      "Supply chain security"
    ],
    affectedSystems: ["Windows XP", "Windows Vista", "Windows 7", "Windows 8", "Windows 10"],
    discoveryDate: "2017-06-27",
    aliases: ["ExPetr", "Diskcoder.C"],
    technicalDetails: "Combines multiple propagation methods, overwrites MBR, uses EternalBlue and EternalRomance exploits, designed for maximum damage.",
    references: [
      "CVE-2017-0144",
      "MITRE ATT&CK: T1486"
    ]
  },
  {
    name: "Dridex",
    type: "Trojan",
    severity: "High",
    description: "Dridex is a banking trojan that steals credentials and serves as a dropper for other malware including ransomware.",
    introduction: "Dridex spreads primarily through malicious email attachments, particularly Office documents with macros. It targets banking and financial credentials.",
    symptoms: [
      "Banking credential theft",
      "Unauthorized financial transactions",
      "System performance issues",
      "Browser behavior modifications",
      "Additional malware infections"
    ],
    mitigation: [
      "Change banking passwords immediately",
      "Monitor financial accounts",
      "Remove malicious browser components",
      "Check for additional payloads",
      "Update security software"
    ],
    prevention: [
      "Disable macros in Office applications",
      "Email security filtering",
      "Banking security measures",
      "Regular security updates",
      "User awareness training",
      "Network monitoring"
    ],
    affectedSystems: ["Windows 7", "Windows 8", "Windows 10", "Windows Server"],
    discoveryDate: "2014-11-01",
    aliases: ["Bugat", "Cridex"],
    technicalDetails: "Modular architecture, web injection capabilities, credential harvesting, payload delivery mechanism, encrypted C2 communication.",
    references: [
      "MITRE ATT&CK: T1555",
      "Europol Joint Action"
    ]
  },
  {
    name: "Kelihos",
    type: "Botnet",
    severity: "Medium",
    description: "Kelihos is a peer-to-peer botnet used for spam distribution, bitcoin mining, and credential theft.",
    introduction: "Kelihos spreads through spam emails, infected USB drives, and other malware. It creates a decentralized botnet for various malicious activities.",
    symptoms: [
      "High network traffic",
      "Spam email sending",
      "System resource usage",
      "Cryptocurrency mining activity",
      "Credential theft attempts"
    ],
    mitigation: [
      "Block botnet communication",
      "Remove botnet components",
      "Change compromised credentials",
      "Monitor network traffic",
      "Update security software"
    ],
    prevention: [
      "Email filtering systems",
      "USB device security",
      "Network monitoring",
      "Endpoint protection",
      "User security training",
      "Regular system updates"
    ],
    affectedSystems: ["Windows XP", "Windows Vista", "Windows 7", "Windows 8"],
    discoveryDate: "2010-12-01",
    aliases: ["Hlux", "Kelihos.B"],
    technicalDetails: "Peer-to-peer architecture, multiple operational purposes, encrypted communication, domain generation algorithm for C2.",
    references: [
      "MITRE ATT&CK: T1568",
      "Microsoft Takedown Operation"
    ]
  },
  {
    name: "Carbanak",
    type: "Backdoor",
    severity: "Critical",
    description: "Carbanak is sophisticated malware used in targeted attacks against financial institutions and hospitality companies.",
    introduction: "Carbanak spreads through spear-phishing emails targeting financial institutions. It provides remote access for manual operation by attackers.",
    symptoms: [
      "Unauthorized remote access",
      "ATM cash dispensing",
      "SWIFT network manipulation",
      "Database access and modification",
      "Lateral movement activity"
    ],
    mitigation: [
      "Isolate affected financial systems",
      "Review transaction logs",
      "Change administrative credentials",
      "Monitor for data exfiltration",
      "Coordinate with financial authorities"
    ],
    prevention: [
      "Advanced persistent threat detection",
      "Network segmentation for financial systems",
      "Multi-factor authentication",
      "Privileged access management",
      "Regular security assessments",
      "Financial transaction monitoring"
    ],
    affectedSystems: ["Windows 7", "Windows 8", "Windows 10", "Windows Server", "ATM Systems"],
    discoveryDate: "2015-02-16",
    aliases: ["Anunak"],
    technicalDetails: "Remote access trojan, legitimate tool abuse, manual operation by attackers, financial system exploitation capabilities.",
    references: [
      "MITRE ATT&CK: T1021",
      "Kaspersky APT Report"
    ]
  },
  {
    name: "Ramnit",
    type: "Worm",
    severity: "Medium",
    description: "Ramnit is a multi-component malware that infects executable files, steals credentials, and creates botnets.",
    introduction: "Ramnit spreads through infected executable files, removable drives, and network shares. It combines file infection with banking trojan capabilities.",
    symptoms: [
      "Executable file infections",
      "Banking credential theft",
      "FTP credential harvesting",
      "Browser cookie theft",
      "Botnet participation"
    ],
    mitigation: [
      "Clean infected executable files",
      "Change stolen credentials",
      "Remove botnet components",
      "Update antivirus definitions",
      "Monitor network communications"
    ],
    prevention: [
      "File integrity monitoring",
      "Credential protection mechanisms",
      "Network access controls",
      "Regular security scans",
      "User account monitoring",
      "Backup and recovery procedures"
    ],
    affectedSystems: ["Windows XP", "Windows Vista", "Windows 7", "Windows 8"],
    discoveryDate: "2010-04-01",
    aliases: ["Ramnit.A", "Ramnit Worm"],
    technicalDetails: "File infector combined with banking trojan, HTML injection capabilities, FTP credential theft, botnet functionality.",
    references: [
      "MITRE ATT&CK: T1055",
      "Europol Takedown Operation"
    ]
  },
  {
    name: "Maze",
    type: "Ransomware",
    severity: "Critical",
    description: "Maze is ransomware that not only encrypts files but also exfiltrates data before encryption, enabling double extortion.",
    introduction: "Maze spreads through various methods including email attachments, exploit kits, and RDP attacks. It pioneered the double extortion model in ransomware.",
    symptoms: [
      "File encryption with .maze extension",
      "Data exfiltration before encryption",
      "Public leak site threats",
      "Network reconnaissance activity",
      "Credential harvesting attempts"
    ],
    mitigation: [
      "Isolate affected systems immediately",
      "Assess data exfiltration scope",
      "Coordinate legal response",
      "Restore from secure backups",
      "Implement breach notification procedures"
    ],
    prevention: [
      "Data loss prevention systems",
      "Network segmentation",
      "Privileged access management",
      "Regular backup testing",
      "Incident response planning",
      "Employee security training"
    ],
    affectedSystems: ["Windows 7", "Windows 8", "Windows 10", "Windows Server"],
    discoveryDate: "2019-05-01",
    aliases: ["Maze Ransomware"],
    technicalDetails: "ChaCha20 encryption algorithm, data exfiltration capabilities, public leak sites, targeted manual operations, double extortion model.",
    references: [
      "MITRE ATT&CK: T1486",
      "CISA Alert AA20-345A"
    ]
  },
  {
    name: "Stuxnet",
    type: "Worm",
    severity: "Critical",
    description: "Stuxnet is a sophisticated computer worm designed to target industrial control systems, specifically Siemens SCADA systems used in nuclear facilities.",
    introduction: "Stuxnet was discovered in 2010 and is believed to be developed by US and Israeli intelligence agencies. It spreads through USB drives and network shares, targeting specific industrial control systems.",
    symptoms: [
      "Unusual PLC behavior",
      "Unexplained equipment failures",
      "Network anomalies in industrial systems",
      "Modified Step7 project files",
      "Centrifuge speed variations"
    ],
    mitigation: [
      "Isolate industrial control networks",
      "Update Siemens Step7 software",
      "Scan and clean infected systems",
      "Review PLC configurations",
      "Implement network monitoring"
    ],
    prevention: [
      "Air-gap critical industrial systems",
      "Restrict USB device usage",
      "Network segmentation for OT/IT",
      "Regular security audits of SCADA systems",
      "Employee training on removable media risks",
      "Implement zero-trust architecture"
    ],
    affectedSystems: ["Windows systems", "Siemens Step7", "Siemens WinCC", "PCS 7 systems"],
    discoveryDate: "2010-06-17",
    aliases: ["Olympic Games", "Worm.Win32.Stuxnet"],
    technicalDetails: "Uses four zero-day exploits, rootkit capabilities, and specifically targets Siemens S7-300 and S7-400 PLCs. Modifies centrifuge speeds while reporting normal operation.",
    references: [
      "CVE-2010-2568",
      "CVE-2010-2729",
      "MITRE ATT&CK: T1027"
    ]
  },
  {
    name: "Zeus",
    type: "Trojan",
    severity: "High",
    description: "Zeus is a banking trojan designed to steal banking credentials through form grabbing and keystroke logging.",
    introduction: "First discovered in 2007, Zeus spreads primarily through phishing emails and drive-by downloads. It establishes persistence through registry modifications and communicates with C2 servers to exfiltrate data.",
    symptoms: [
      "Suspicious banking transactions",
      "Browser redirections",
      "Slow system performance",
      "Unexpected network activity",
      "Modified browser behavior"
    ],
    mitigation: [
      "Change all banking credentials immediately",
      "Run comprehensive malware scan",
      "Block C2 communication",
      "Monitor financial accounts",
      "Restore browser settings"
    ],
    prevention: [
      "Use dedicated device for banking",
      "Keep browsers updated",
      "Avoid suspicious email attachments",
      "Use two-factor authentication",
      "Regular system updates",
      "Banking-specific security software"
    ],
    affectedSystems: ["Windows XP", "Windows Vista", "Windows 7", "Windows 8", "Internet Explorer", "Firefox", "Chrome"],
    discoveryDate: "2007-07-01",
    aliases: ["Zbot", "PRG", "Wsnpoem", "Gorhax", "Kneber"],
    technicalDetails: "Uses process injection, API hooking, and encrypted communication. Targets financial institutions through web injects and form grabbing.",
    references: [
      "MITRE ATT&CK: T1555.003",
      "FBI IC3 Alert"
    ]
  },
  {
    name: "Conficker",
    type: "Worm",
    severity: "High",
    description: "Conficker is a computer worm that targets Windows operating systems, creating large botnets for various malicious activities.",
    introduction: "Discovered in November 2008, Conficker spreads through network shares, removable drives, and exploiting Windows vulnerabilities. It has infected millions of computers worldwide.",
    symptoms: [
      "Disabled Windows Automatic Updates",
      "Blocked access to security websites",
      "Slow network performance",
      "High network traffic",
      "Disabled security services"
    ],
    mitigation: [
      "Apply MS08-067 security patch",
      "Use Conficker removal tools",
      "Reset local administrator passwords",
      "Enable Windows Firewall",
      "Scan removable media"
    ],
    prevention: [
      "Keep Windows systems updated",
      "Use strong administrator passwords",
      "Disable AutoRun for removable media",
      "Network access control",
      "Regular antivirus updates",
      "Monitor network for suspicious activity"
    ],
    affectedSystems: ["Windows 2000", "Windows XP", "Windows Vista", "Windows Server 2003", "Windows Server 2008"],
    discoveryDate: "2008-11-21",
    aliases: ["Downup", "Downadup", "Kido"],
    technicalDetails: "Exploits MS08-067 vulnerability, uses domain generation algorithm (DGA) for C2 communication, and implements peer-to-peer communication.",
    references: [
      "CVE-2008-4250",
      "MS08-067",
      "MITRE ATT&CK: T1021.002"
    ]
  },
  {
    name: "Ryuk",
    type: "Ransomware",
    severity: "Critical",
    description: "Ryuk is targeted ransomware known for attacking enterprise networks and demanding large ransom payments.",
    introduction: "First observed in August 2018, Ryuk is typically deployed after initial network compromise through other malware like Emotet or TrickBot. It focuses on high-value targets and demands substantial ransoms.",
    symptoms: [
      "Files encrypted with .ryk extension",
      "Ransom note 'RyukReadMe.txt'",
      "Disabled Windows services",
      "Deleted shadow copies",
      "Network share encryption"
    ],
    mitigation: [
      "Isolate infected systems immediately",
      "Preserve evidence for investigation",
      "Assess backup integrity",
      "Check for lateral movement",
      "Coordinate with law enforcement"
    ],
    prevention: [
      "Network segmentation",
      "Privileged access management",
      "Regular backup testing",
      "Endpoint detection and response",
      "User activity monitoring",
      "Incident response planning"
    ],
    affectedSystems: ["Windows 7", "Windows 10", "Windows Server 2012", "Windows Server 2016", "Windows Server 2019"],
    discoveryDate: "2018-08-13",
    aliases: ["Hermes 2.1"],
    technicalDetails: "Uses AES-256 encryption, targets network shares, disables Windows Defender, and deletes Volume Shadow Copies using vssadmin.",
    references: [
      "CISA Alert AA20-302A",
      "MITRE ATT&CK: T1486"
    ]
  },
  {
    name: "BlackEnergy",
    type: "Trojan",
    severity: "High",
    description: "BlackEnergy is a malware toolkit that has evolved from a DDoS botnet into sophisticated malware targeting critical infrastructure.",
    introduction: "BlackEnergy spreads through spear-phishing emails and watering hole attacks. It has been used in attacks against power grids and other critical infrastructure.",
    symptoms: [
      "Unauthorized remote access",
      "Power system disruptions",
      "Data exfiltration activity",
      "Lateral movement in networks",
      "HMI system compromise"
    ],
    mitigation: [
      "Isolate critical infrastructure systems",
      "Change administrative credentials",
      "Monitor SCADA communications",
      "Check for persistence mechanisms",
      "Coordinate with security agencies"
    ],
    prevention: [
      "Network segmentation for critical systems",
      "Advanced persistent threat detection",
      "Regular security assessments",
      "Employee security training",
      "Multi-factor authentication",
      "Industrial control system security"
    ],
    affectedSystems: ["Windows Systems", "SCADA", "Industrial Control Systems"],
    discoveryDate: "2007-01-01",
    aliases: ["BE", "BlackEnergy Lite"],
    technicalDetails: "Modular architecture, plugin system, SSH backdoor capabilities, targets industrial control systems, sophisticated evasion techniques.",
    references: [
      "MITRE ATT&CK: T1021.004",
      "ICS-CERT Alert"
    ]
  },
  {
    name: "APT1 Comment Crew",
    type: "Backdoor",
    severity: "Critical",
    description: "APT1 is a sophisticated threat actor using custom malware for long-term espionage campaigns against various industries.",
    introduction: "APT1 conducts targeted attacks primarily through spear-phishing emails. The group maintains long-term access to compromised networks for intellectual property theft.",
    symptoms: [
      "Unauthorized data exfiltration",
      "Long-term network persistence",
      "Custom malware installation",
      "Lateral movement activity",
      "Intellectual property theft"
    ],
    mitigation: [
      "Hunt for persistence mechanisms",
      "Change all administrative credentials",
      "Review data access logs",
      "Monitor for data exfiltration",
      "Coordinate with threat intelligence"
    ],
    prevention: [
      "Advanced persistent threat detection",
      "Network monitoring and analytics",
      "Employee awareness training",
      "Multi-factor authentication",
      "Data loss prevention",
      "Regular security assessments"
    ],
    affectedSystems: ["Windows Systems", "Network Infrastructure"],
    discoveryDate: "2006-01-01",
    aliases: ["Comment Crew", "PLA Unit 61398"],
    technicalDetails: "Custom backdoors, remote access tools, data exfiltration capabilities, long-term persistence, sophisticated operational security.",
    references: [
      "MITRE ATT&CK: T1041",
      "Mandiant APT1 Report"
    ]
  },
  {
    name: "Flame",
    type: "Spyware",
    severity: "Critical",
    description: "Flame is sophisticated espionage malware with extensive data collection and surveillance capabilities.",
    introduction: "Flame spreads through various methods including USB drives, network shares, and Windows Update spoofing. It was designed for cyber espionage operations in the Middle East.",
    symptoms: [
      "Massive data collection activity",
      "Audio recording capabilities",
      "Screen capture activity",
      "Network traffic interception",
      "Bluetooth device enumeration"
    ],
    mitigation: [
      "Isolate infected systems immediately",
      "Assess scope of data compromise",
      "Check for audio/video recordings",
      "Review network communications",
      "Change all credentials"
    ],
    prevention: [
      "Network monitoring and analysis",
      "USB device restrictions",
      "Certificate pinning",
      "Regular security updates",
      "Data loss prevention",
      "Employee security awareness"
    ],
    affectedSystems: ["Windows XP", "Windows Vista", "Windows 7"],
    discoveryDate: "2012-05-28",
    aliases: ["Flamer", "sKyWIper"],
    technicalDetails: "Modular architecture, multiple propagation methods, audio recording, screen capture, network interception, Bluetooth scanning, massive codebase.",
    references: [
      "CVE-2012-1723",
      "MITRE ATT&CK: T1005"
    ]
  },
  {
    name: "Duqu",
    type: "Trojan",
    severity: "Critical",
    description: "Duqu is reconnaissance malware designed to gather intelligence from industrial control systems, often called 'Son of Stuxnet'.",
    introduction: "Duqu spreads through targeted spear-phishing attacks with infected Word documents. It shares code similarities with Stuxnet and focuses on intelligence gathering.",
    symptoms: [
      "Unauthorized system reconnaissance",
      "Keylogger activity",
      "Network topology mapping",
      "Industrial system monitoring",
      "Data exfiltration to C2 servers"
    ],
    mitigation: [
      "Isolate industrial networks",
      "Remove reconnaissance components",
      "Change administrative passwords",
      "Monitor for data exfiltration",
      "Update security software"
    ],
    prevention: [
      "Network segmentation for industrial systems",
      "Email attachment scanning",
      "Regular security updates",
      "Employee security training",
      "Industrial control system monitoring",
      "Threat intelligence integration"
    ],
    affectedSystems: ["Windows Systems", "Industrial Control Systems"],
    discoveryDate: "2011-09-01",
    aliases: ["W32.Duqu"],
    technicalDetails: "Stuxnet-related code, modular architecture, keylogger capabilities, network reconnaissance, encrypted C2 communication, industrial system targeting.",
    references: [
      "MITRE ATT&CK: T1082",
      "Symantec Duqu Report"
    ]
  },
  {
    name: "Shamoon",
    type: "Worm",
    severity: "Critical",
    description: "Shamoon is destructive malware that overwrites hard drive data with an image and spreads across networks.",
    introduction: "Shamoon spreads through network shares in corporate environments. It was used in attacks against Saudi Aramco and other organizations in the Middle East.",
    symptoms: [
      "Hard drive data destruction",
      "System boot failures",
      "Network share corruption",
      "Image displayed on screens",
      "Mass system failures"
    ],
    mitigation: [
      "Isolate affected networks immediately",
      "Stop system reboots",
      "Preserve forensic evidence",
      "Restore from backups",
      "Rebuild affected systems"
    ],
    prevention: [
      "Network segmentation",
      "Access controls on network shares",
      "Regular backup verification",
      "Endpoint protection",
      "Network monitoring",
      "Incident response planning"
    ],
    affectedSystems: ["Windows XP", "Windows Vista", "Windows 7", "Windows Server"],
    discoveryDate: "2012-08-15",
    aliases: ["W32.DistTrack"],
    technicalDetails: "Network propagation, data wiping capabilities, overwrites MBR, displays specific image, targets network shares, destructive payload.",
    references: [
      "MITRE ATT&CK: T1485",
      "Symantec Shamoon Report"
    ]
  },
  {
    name: "Agent.BTZ",
    type: "Worm",
    severity: "High",
    description: "Agent.BTZ is a USB-spreading worm that created one of the most significant breaches of US military networks.",
    introduction: "Agent.BTZ spreads through infected USB drives and was responsible for breaching classified US military networks, leading to the creation of US Cyber Command.",
    symptoms: [
      "USB drive infections",
      "Network propagation",
      "Data exfiltration activity",
      "Persistence mechanisms",
      "C2 communication"
    ],
    mitigation: [
      "Remove infected USB drives",
      "Isolate compromised networks",
      "Update antivirus definitions",
      "Monitor for data exfiltration",
      "Change network credentials"
    ],
    prevention: [
      "USB device restrictions",
      "Network segmentation",
      "Regular security updates",
      "Employee security training",
      "Data loss prevention",
      "Network monitoring"
    ],
    affectedSystems: ["Windows XP", "Windows Vista", "Military Networks"],
    discoveryDate: "2008-10-01",
    aliases: ["SillyFDC"],
    technicalDetails: "USB propagation, network spreading, data collection, C2 communication, persistence mechanisms, classified network compromise.",
    references: [
      "MITRE ATT&CK: T1091",
      "DoD Cyber Security Report"
    ]
  },
  {
    name: "RedLine Stealer",
    type: "Spyware",
    severity: "High",
    description: "RedLine Stealer is information-stealing malware that harvests credentials, cryptocurrency wallets, and personal data.",
    introduction: "RedLine Stealer spreads through malicious email attachments, cracked software, and fake installers. It's sold as malware-as-a-service to cybercriminals.",
    symptoms: [
      "Credential harvesting",
      "Cryptocurrency wallet theft",
      "Browser data extraction",
      "System information gathering",
      "File exfiltration"
    ],
    mitigation: [
      "Change all stored passwords",
      "Monitor cryptocurrency accounts",
      "Check browser saved data",
      "Run comprehensive security scan",
      "Monitor for identity theft"
    ],
    prevention: [
      "Use password managers",
      "Enable two-factor authentication",
      "Avoid cracked software",
      "Email attachment scanning",
      "Regular security updates",
      "Cryptocurrency security practices"
    ],
    affectedSystems: ["Windows 7", "Windows 8", "Windows 10", "Windows 11"],
    discoveryDate: "2020-03-01",
    aliases: ["RedLine"],
    technicalDetails: "Credential harvesting, cryptocurrency wallet targeting, browser data extraction, system fingerprinting, encrypted C2 communication.",
    references: [
      "MITRE ATT&CK: T1555",
      "CISA Malware Analysis"
    ]
  },
  {
    name: "Raccoon Stealer",
    type: "Spyware",
    severity: "Medium",
    description: "Raccoon Stealer is malware-as-a-service that steals passwords, credit card data, and cryptocurrency information.",
    introduction: "Raccoon Stealer spreads through email campaigns, exploit kits, and software bundling. It operates as a service with regular updates and customer support.",
    symptoms: [
      "Password database theft",
      "Credit card information extraction",
      "Cryptocurrency wallet harvesting",
      "Browser data collection",
      "Email credential theft"
    ],
    mitigation: [
      "Change all compromised passwords",
      "Monitor financial accounts",
      "Check credit card statements",
      "Scan for additional malware",
      "Update security software"
    ],
    prevention: [
      "Use unique passwords per account",
      "Enable multi-factor authentication",
      "Regular financial monitoring",
      "Email security filtering",
      "Browser security settings",
      "Cryptocurrency security measures"
    ],
    affectedSystems: ["Windows 7", "Windows 8", "Windows 10"],
    discoveryDate: "2019-04-01",
    aliases: ["Raccoon"],
    technicalDetails: "Modular stealer, encrypted C2 communication, credential harvesting, financial data targeting, cryptocurrency theft capabilities.",
    references: [
      "MITRE ATT&CK: T1555.003",
      "Cyber Threat Intelligence Report"
    ]
  },
  {
    name: "Vidar Stealer",
    type: "Spyware",
    severity: "Medium",
    description: "Vidar is information-stealing malware that targets browsers, cryptocurrency wallets, and messaging applications.",
    introduction: "Vidar spreads through malvertising, software cracks, and email attachments. It's designed to steal a wide variety of sensitive information.",
    symptoms: [
      "Browser credential theft",
      "Cryptocurrency wallet access",
      "Email account compromise",
      "File system enumeration",
      "System information collection"
    ],
    mitigation: [
      "Reset browser stored passwords",
      "Secure cryptocurrency accounts",
      "Check email account access",
      "Remove malicious software",
      "Monitor for data misuse"
    ],
    prevention: [
      "Browser security hardening",
      "Cryptocurrency cold storage",
      "Email security measures",
      "Software from trusted sources",
      "Regular security scans",
      "Network monitoring"
    ],
    affectedSystems: ["Windows 7", "Windows 8", "Windows 10", "Windows 11"],
    discoveryDate: "2018-12-01",
    aliases: ["Vidar"],
    technicalDetails: "Information stealer, browser targeting, cryptocurrency focus, messaging app harvesting, system reconnaissance capabilities.",
    references: [
      "MITRE ATT&CK: T1555.003",
      "Malware Analysis Report"
    ]
  },
  {
    name: "Azorult",
    type: "Spyware",
    severity: "Medium",
    description: "Azorult is information-stealing malware that harvests credentials, cryptocurrency data, and system information.",
    introduction: "Azorult spreads through exploit kits, malicious email attachments, and fake software installers. It has evolved through multiple versions with enhanced capabilities.",
    symptoms: [
      "Credential database theft",
      "Cryptocurrency wallet harvesting",
      "Browser history extraction",
      "File system enumeration",
      "Desktop screenshot capture"
    ],
    mitigation: [
      "Change all stored credentials",
      "Monitor cryptocurrency accounts",
      "Clear browser stored data",
      "Run malware removal tools",
      "Check for additional payloads"
    ],
    prevention: [
      "Credential management solutions",
      "Browser security configurations",
      "Cryptocurrency security practices",
      "Email attachment scanning",
      "Software installation controls",
      "Network traffic monitoring"
    ],
    affectedSystems: ["Windows 7", "Windows 8", "Windows 10"],
    discoveryDate: "2016-07-01",
    aliases: ["Azorult Stealer"],
    technicalDetails: "Information harvesting, multi-browser support, cryptocurrency targeting, screenshot capabilities, modular architecture.",
    references: [
      "MITRE ATT&CK: T1555",
      "Threat Intelligence Report"
    ]
  },
  {
    name: "Pony Stealer",
    type: "Spyware",
    severity: "Medium",
    description: "Pony is a credential-stealing trojan that harvests passwords from multiple applications and web browsers.",
    introduction: "Pony spreads through email attachments, exploit kits, and software bundling. It targets a wide range of applications for credential harvesting.",
    symptoms: [
      "Password harvesting from applications",
      "Browser credential theft",
      "FTP client data extraction",
      "Email client credential theft",
      "Gaming platform account theft"
    ],
    mitigation: [
      "Reset all application passwords",
      "Change browser stored credentials",
      "Update FTP client settings",
      "Secure email accounts",
      "Monitor gaming accounts"
    ],
    prevention: [
      "Application-specific security measures",
      "Browser credential protection",
      "Multi-factor authentication",
      "Regular password rotation",
      "Software updates",
      "Email security filtering"
    ],
    affectedSystems: ["Windows XP", "Windows Vista", "Windows 7", "Windows 8"],
    discoveryDate: "2013-01-01",
    aliases: ["Pony Loader", "Fareit"],
    technicalDetails: "Credential harvesting, multi-application targeting, browser data extraction, wide application support, modular design.",
    references: [
      "MITRE ATT&CK: T1555",
      "Cybersecurity Report"
    ]
  }
];

export const virusCategories = [
  'All',
  'Ransomware',
  'Trojan',
  'Worm',
  'Rootkit',
  'Spyware',
  'Adware',
  'Botnet',
  'Keylogger',
  'Backdoor',
  'Virus'
];

export const severityLevels = ['All', 'Low', 'Medium', 'High', 'Critical'];
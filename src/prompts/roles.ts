// src/prompts/roles.ts

import { CEO_AGENT } from "../agents/ceo";
import { CTO_AGENT } from "../agents/cto";
import { CFO_AGENT } from "../agents/cfo";
import { CMO_AGENT } from "../agents/cmo";
import { VC_AGENT } from "../agents/vc";

export const EXECUTIVE_ROLES = `
${CEO_AGENT.role} (${CEO_AGENT.title})
${CTO_AGENT.role} (${CTO_AGENT.title})
${CFO_AGENT.role} (${CFO_AGENT.title})
${CMO_AGENT.role} (${CMO_AGENT.title})
${VC_AGENT.role} (${VC_AGENT.title})
`;
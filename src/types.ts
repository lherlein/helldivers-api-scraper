export type ResponseStandard = {
    success: boolean,
    message: string,
    status: number,
    data: any
}

export type Index2Name = {
    map: IndexName[]
};

type IndexName = {
    index: number,
    name: string
}

export type RequestData = {
    timestamp: string,
    request: any
};

export type MiddlemanGetResponse = {
    timestamp: string,
    status: number,
    data: RawInfo | RawStatus | null
};

export type RawInfo = {
    warId: number,
    startDate: number,
    endDate: number,
    minimumClientVersion: string,
    planetInfos: [PlanetInfo],
    homeWorlds: [HomeWorlds],
    capitalInfos: [any], // un-filled
    planetPermanentEffects: [any], // un-filled
};

export type RawStatus = {
    warId: number,
    time: number,
    impactMultiplier: number,
    storyBeatId32: number,
    planetStatus: [PlanetStatus],
    planetAttacks: [PlanetAttack],
    campaigns: [Campaign],
    communityTargets: [any], // un-filled
    jointOperations: [JointOperation],
    planetEvents: [PlanetEvents],
    planetActiveEffects: [any], // un-filled
    activeElectionPolicyEffects: [any], // un-filled
    globalEvents: [GlobalEvent],
    superEarthWarResults: [any], // un-filled
};

export type PlanetStatus = {
    index: number,
    owner: number,
    health: number,
    regenPerSecond: number,
    players: number
};

export type PlanetStatusWithName = {
    index: number,
    owner: number,
    health: number,
    regenPerSecond: number,
    players: number,
    name: string
};

export type PlanetAttack = {
    source: number,
    target: number
};

export type Campaign = {
    id: number,
    planetIndex: number,
    type: number,
    count: number
};

export type JointOperation = {
    id: number,
    planetIndex: number,
    hqNodeIndex: number
};

export type PlanetEvents = {
    id: number,
    planetIndex: number,
    eventType: number,
    race: number,
    health: number,
    maxHealth: number,
    startTime: number,
    expireTime: number,
    campaignId: number,
    jointOperationIds: [number]
};

export type GlobalEvent = {
    eventId: number,
    id32: number,
    portraitId32: number,
    title: string,
    titleId32: number,
    message: string,
    messageId32: number,
    race: number,
    flags: number,
    assignmentId32: number,
    effectIds: [any], // un-filled
    planetIndices: [any], // un-filled
};

export type PlanetInfo = {
    index: number,
    settingsHash: number,
    position: {
        x: number,
        y: number
    },
    waypoints: [number],
    sector: 0,
    maxHealth: number,
    disabled: boolean,
    initialOwner: number,
};

export type HomeWorlds = {
    race: number,
    planetIndices: [number]
};
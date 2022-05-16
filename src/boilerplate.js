import ReactDOM from "react-dom";

const instanceConfig = {};

let instanceData = {};

let preData = {};

export function updateStateListener(data) {
    const cData = Object.assign(
        {},
        { ...instanceData },
        JSON.parse(JSON.stringify(data))
    );

    if (JSON.stringify(cData) !== JSON.stringify(instanceData)) {
        instanceData = { ...cData };
        postState(instanceData);
    }
}

export function removeState(data) {
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
        const item = keys[i];
        delete instanceData[item];
    }
    postState(instanceData);
}

function postState() {
    const data = {
        instanceId: instanceConfig.instanceId,
        state: instanceData,
    };
    window.parent.postMessage({ ...data }, "*");
    preData = { ...data };
}

export function listenToParentIPC() {
    window.addEventListener("message", (e) => {
        instanceConfig.instanceId = e.data.instanceId;
        if (
            JSON.stringify(preData) !==
            JSON.stringify({
                instanceId: instanceConfig.instanceId,
                state: instanceData,
            })
        ) {
            postState();
        }
    });
}

export function render(elem) {
    document.addEventListener("DOMContentLoaded", () => {
        ReactDOM.render(elem, document.body);
    });
}

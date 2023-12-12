//------------------------------------------------------------------------------
import {
  publicToken,
  mainSceneUUID,
  characterControllerSceneUUID,
  cubeSmUUID,
  Mat_LD_Dark
} from "./config.js";

//------------------------------------------------------------------------------
window.addEventListener("load", InitApp);

// The scene that is spawned when clicking "Link Scene"
const sceneToLinkUUID = '47ba1509-75a2-4709-b879-14d5401f612c';
let linkedSceneEntity = null;
let cubeEntity = null;
let btnToggleScene;
let btnToggleCube;

//------------------------------------------------------------------------------
async function InitApp() {
    btnToggleScene = document.getElementById("btn-toggle-scene");
    btnToggleCube = document.getElementById("btn-toggle-cube");
    btnToggleScene.innerText = "Spawn Scene";
    btnToggleCube.innerText = "Spawn Cube";
    let canvas = document.getElementById("display-canvas");
    const isSessionCreator = await SDK3DVerse.joinOrStartSession({
        userToken: publicToken,
        sceneUUID: mainSceneUUID,
        canvas: canvas,
        connectToEditor: true,
        startSimulation: "on-assets-loaded",
    });

    SDK3DVerse.actionMap.values["JUMP"] = [["KEY_32"]];
    SDK3DVerse.actionMap.propagate();

    await InitFirstPersonController(characterControllerSceneUUID);
    canvas.addEventListener('mousedown', () => setPointerLock(canvas));

    // But do it a single time for the whole session life time.
    if(isSessionCreator) {
        const transform = {
            position : [0,2,0],
            orientation: SDK3DVerse.utils.quaternionFromEuler([-30, 45, 0])
        };
        const options = {
            deleteOnClientDisconnection: true
        };
        spawnCube(
            transform,
            options
        );
    }
}

const setPointerLock = (canvas) => {
    setFPSCameraController(canvas);
    //canvas.removeEventListener('mousedown', () => setPointerLock(canvas));
}

//------------------------------------------------------------------------------
async function setFPSCameraController(canvas){
    // Remove the required click for the LOOK_LEFT, LOOK_RIGHT, LOOK_UP, and 
    // LOOK_DOWN actions.
    SDK3DVerse.actionMap.values["LOOK_LEFT"][0] = ["MOUSE_AXIS_X_POS"];
    SDK3DVerse.actionMap.values["LOOK_RIGHT"][0] = ["MOUSE_AXIS_X_NEG"];
    SDK3DVerse.actionMap.values["LOOK_DOWN"][0] = ["MOUSE_AXIS_Y_NEG"];
    SDK3DVerse.actionMap.values["LOOK_UP"][0] = ["MOUSE_AXIS_Y_POS"];
    SDK3DVerse.actionMap.values["JUMP"] = [["KEY_32"]];
    SDK3DVerse.actionMap.propagate();

    // Lock the mouse pointer
    canvas.requestPointerLock = (
        canvas.requestPointerLock 
        || canvas.mozRequestPointerLock 
        || canvas.webkitPointerLockElement
    );
    canvas.requestPointerLock({unadjustedMovement: true});
};


//------------------------------------------------------------------------------
async function InitFirstPersonController(charCtlSceneUUID) {
    // To spawn an entity we need to create an EntityTempllate and specify the
    // components we want to attach to it. In this case we only want a scene_ref
    // that points to the character controller scene.
    const playerTemplate = new SDK3DVerse.EntityTemplate();
    playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });

    // Passing null as parent entity will instantiate our new entity at the root
    // of the main scene.
    const parentEntity = null;
    // Setting this option to true will ensure that our entity will be destroyed
    // when the client is disconnected from the session, making sure we don't
    // leave our 'dead' player body behind.
    const deleteOnClientDisconnection = true;
    // We don't want the player to be saved forever in the scene, so we
    // instantiate a transient entity.
    // Note that an entity template can be instantiated multiple times.
    // Each instantiation results in a new entity.
    const playerSceneEntity = await playerTemplate.instantiateTransientEntity(
        "Player",
        parentEntity,
        deleteOnClientDisconnection
    );

    // The character controller scene is setup as having a single entity at its
    // root which is the first person controller itself.
    const firstPersonController = (await playerSceneEntity.getChildren())[0];
    // Look for the first person camera in the children of the controller.
    const children = await firstPersonController.getChildren();
    const firstPersonCamera = children.find((child) =>
        child.isAttached("camera")
    );

    // We need to assign the current client to the first person controller
    // script which is attached to the firstPersonController entity.
    // This allows the script to know which client inputs it should read.
    SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);

    // Finally set the first person camera as the main camera.
    SDK3DVerse.setMainCamera(firstPersonCamera);
}

async function GetTransformOfPlayer() {
    let playerValue = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getTransform();
    playerValue[0] = playerOrientation;
    playerValue[1] = playerPosition;
    playerValue[2] = playerScale;
}

const spawnSceneLinker = async function(sceneTransform, options = {}) {
    const {
        parentEntity = null,
        // delete entity if the client disconnects
        deleteOnClientDisconnection = true
    } = options;

    let template = new SDK3DVerse.EntityTemplate();
    template.attachComponent('scene_ref', { value: sceneToLinkUUID });
    template.attachComponent('local_transform', sceneTransform);
    const entity = await template.instantiateTransientEntity("tempo_scene", parentEntity, deleteOnClientDisconnection);
    return entity;
}

window.toggleSceneLinker = async function() {
    if(linkedSceneEntity) {
        await SDK3DVerse.engineAPI.deleteEntities([linkedSceneEntity]).finally(() => {
            linkedSceneEntity = null;
            btnToggleScene.innerText = "Spawn Scene";
        });
    }
    else {
        linkedSceneEntity = await spawnSceneLinker({ position: [0, 0, -3] });
        btnToggleScene.innerText = "Delete Scene";
    }
}

const spawnCube = async function(pointCubeTransform, options = {})  {
    const {
        parentEntity = null,
        // delete entity if the client disconnects
        deleteOnClientDisconnection = true,
     } = options;

    let template = new SDK3DVerse.EntityTemplate();

    // Attaches mesh_ref component as well as local_transform component, which is a dependency of mesh_ref
    template.attachComponent('mesh_ref', { value : cubeSmUUID });
    // --Hard code for position in scene--
    template.attachComponent('local_transform', pointCubeTransform );
    // All others material settings
    template.attachComponent('box_geometry', { offset : [ 0.5, 0.5, 0.5 ] })
    template.attachComponent('material_ref', { value : Mat_LD_Dark })
    template.attachComponent('physics_material', { restitution : 0.2 })
    template.attachComponent('rigid_body', { mass : 5, centerOfMass : [ 0.5, 0.5, 0.5 ] });

    const entity  = await template.instantiateTransientEntity("cube", parentEntity, deleteOnClientDisconnection);
    
    SDK3DVerse.notifier.on('onEntityCreated', (entity) => { console.log(entity.getName(), 'was created!') });

    return entity;
}

window.toggleCube = async function() {
    if(cubeEntity) {
        await SDK3DVerse.engineAPI.deleteEntities([cubeEntity]).finally(() => {
            cubeEntity = null;
            btnToggleCube.innerText = "Spawn Cube";
        });
    }
    else {
        const transform = {
            position: linkedSceneEntity ? [0, 2, 2] : [0, 2, 1],
            orientation: SDK3DVerse.utils.quaternionFromEuler([-45, 0, 0])
        };
        const options = {
            parentEntity: linkedSceneEntity
        };
        cubeEntity = await spawnCube(
            transform,
            options
        );
        btnToggleCube.innerText = "Delete Cube";
    }
}
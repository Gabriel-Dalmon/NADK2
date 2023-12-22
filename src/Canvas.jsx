import { userPublicToken, mainSceneUUID, characterControllerSceneUUID, spawnPosition} from './config.js';
import { useCallback, useEffect } from 'react';
import { useScript } from '@uidotdev/usehooks';

export function Canvas({ showLock, setIsLoading, handleCanvasChange }) {
    const status = useScript(
        `https://cdn.3dverse.com/legacy/sdk/latest/SDK3DVerse.js`,
        {
            removeOnUnmount: false,
        }
    );

    const callbackConsoleEvent = (content) => {
        console.log(content.dataObject.output);
    }

    //we initialize the global variable ans the setup function for the enigma progression, this is a temporary way to handle enigma, it'll be handled by the server later
    const setupEnigma = useCallback(async () =>{
        var found = (await SDK3DVerse.engineAPI.findEntitiesByNames('helicopter'))[0];
        found.setVisibility(false);
        for (let i = 1; i <= 4; i++) {
            found = (await SDK3DVerse.engineAPI.findEntitiesByNames('wb blueprint '+i))[0];
            console.log(found);
            found.setVisibility(false);
          }
    }, []);
    var handleEnigmaProgression = 0

    const setPointerLock = useCallback(async (canvas) => {
        setFPSCameraController(canvas);
        //canvas.removeEventListener('mousedown', () => setPointerLock(canvas));
    }, []);

    //------------------------------------------------------------------------------

    const focusToEntity = useCallback((target) =>{
        SDK3DVerse.engineAPI.assignClientToScripts(target);
        SDK3DVerse.engineAPI.detachClientFromScripts(window.clientController);
    }, []);
    
    const focusBackToFPC = useCallback((target, basePosition, canvas, e) => {
        if(e.button === 2){
            handleCanvasChange(0);
            console.log("Exit control");

            SDK3DVerse.engineAPI.assignClientToScripts(window.clientController);
            SDK3DVerse.engineAPI.detachClientFromScripts(target);
            console.log(basePosition);
            target.setGlobalTransform(basePosition);
            canvas.removeEventListener('click', () => focusBackToFPC(target, canvas));
        }
    }, [handleCanvasChange]);
    
    const takeControl = useCallback((target) => {
        handleCanvasChange(2);

        target = target.entity.getParent();
        const basePosition = target.getGlobalTransform();
        const playerValue = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getTransform();
        console.log("base:"+basePosition.position);
        
        var distance = [];
        distance.push(basePosition.position[0]-playerValue.position[0],basePosition.position[1]-playerValue.position[1],basePosition.position[2]-playerValue.position[2])
        const norm = Math.sqrt(distance[0]*distance[0]+distance[1]*distance[1]+distance[2]*distance[2]);
        distance[0]/=norm;
        distance[1]=-0.5;
        distance[2]/=norm;
        console.log("distance :"+distance);
        playerValue.position[0]+=2*distance[0];
        playerValue.position[1]+=distance[1];
        playerValue.position[2]+=2*distance[2];

        target.setGlobalTransform(playerValue);
        SDK3DVerse.engineAPI.fireEvent("191b5072-b834-40f0-a616-88a6fc2bd7a3", "horizontal", [target]);
        focusToEntity(target);
        let canvas = document.getElementById("display-canvas");
        canvas.addEventListener('click', (e) => focusBackToFPC(target, basePosition, canvas, e));
    }, [focusToEntity, focusBackToFPC, handleCanvasChange]);

    const buildHelicopter = useCallback(async () => {
        const helicopter = (await SDK3DVerse.engineAPI.findEntitiesByNames('helicopter'))[0];
        helicopter.setVisibility(true);
        //SDK3DVerse.engineAPI.registerToEvent("4ac15242-946d-4fec-8256-c516095969d2", "fly", yourFunctionDoodyDude);
    }, []);

    const moveToWorkbench = useCallback(async function (e, canvas, target){
        if(e.code === "Space"){
            SDK3DVerse.engineAPI.fireEvent("2a32b613-d9c1-4ebe-b5a8-7f1b8aa4f754", "enter_interaction", [target]);
            console.log(target);
            target.setVisibility(false);
            let itemID = target.components.debug_name.value.charAt(10);
            const wbItem = await SDK3DVerse.engineAPI.findEntitiesByNames('wb blueprint '+itemID);
            wbItem[0].setVisibility(true);
            canvas.removeEventListener('keydown', (e) => moveToWorkbench(e, canvas, target));
            handleEnigmaProgression +=1
            console.log(handleEnigmaProgression);
            if(handleEnigmaProgression === 4){
                buildHelicopter()
            }
        }
    }, [buildHelicopter]);

    const bluePrintInterract = useCallback((target) => {
        const moveHandler = (e) => moveToWorkbench(e, canvas, target);

        let canvas = document.getElementById("display-canvas");
        handleCanvasChange(1);
        canvas.addEventListener('keydown', moveHandler);
        SDK3DVerse.actionMap.values["JUMP"] = [[]];
        SDK3DVerse.actionMap.propagate();

        target = target.entity.getParent();
        const basePosition = target.getGlobalTransform();
        const playerValue = SDK3DVerse.engineAPI.cameraAPI.getActiveViewports()[0].getTransform();
        console.log("trigger:");
        
        var distance = [];
        distance.push(basePosition.position[0]-playerValue.position[0],basePosition.position[1]-playerValue.position[1],basePosition.position[2]-playerValue.position[2])
        const norm = Math.sqrt(distance[0]*distance[0]+distance[1]*distance[1]+distance[2]*distance[2]);
        distance[0]/=norm;
        distance[1]=0.5;
        distance[2]/=norm;
        playerValue.position[0]+=2*distance[0];
        playerValue.position[1]-=distance[1];
        playerValue.position[2]+=2*distance[2];

        target.setGlobalTransform(playerValue);
        SDK3DVerse.engineAPI.fireEvent("191b5072-b834-40f0-a616-88a6fc2bd7a3", "horizontal", [target]);
        focusToEntity(target);
        
        setTimeout(canvas.addEventListener('click', (e) => {
            focusBackToFPC(target, basePosition, canvas, e);
            canvas.removeEventListener('keydown', moveHandler);
            SDK3DVerse.actionMap.values["JUMP"] = [["KEY_32"]];
            SDK3DVerse.actionMap.propagate();
        }, 1000));
        setTimeout(canvas.addEventListener('keydown', (e) => {if(e.code === "Space"){
            handleCanvasChange(0);
            SDK3DVerse.engineAPI.assignClientToScripts(window.clientController);
            SDK3DVerse.engineAPI.detachClientFromScripts(target);
            target.setGlobalTransform(basePosition);
            setTimeout(()=>{SDK3DVerse.actionMap.values["JUMP"] = [["KEY_32"]]}, 500);
            SDK3DVerse.actionMap.propagate();
        }}, 1000));
        console.log("cardID");
    }, [focusToEntity, focusBackToFPC, handleCanvasChange, moveToWorkbench]);

    

    const focusObject = useCallback(async (e, canvas) => {
        // Test if the button was indeed left click
        if(e.button === 0){
            // Screen Space Ray on the middle of the screen
            // This stores an [object Promise] in the JS variable
            let objectClicked = await SDK3DVerse.engineAPI.castScreenSpaceRay(canvas.width/2, canvas.height/2, true, false, false);
            console.log(objectClicked.entity.getComponent("debug_name"))
            if(objectClicked.entity != null)
            {
                console.log(objectClicked.entity);
                if(objectClicked.entity.isAttached('script_map') ) { 
                    if("2a32b613-d9c1-4ebe-b5a8-7f1b8aa4f754" in objectClicked.entity.getComponent('script_map').elements){
                        console.log("yep");
                        bluePrintInterract(objectClicked,);
                        
                    }else if(("4002db8b-f68b-4d85-bc12-988b6afabbfe" in objectClicked.entity.getComponent('script_map').elements)||("0c9049c1-d280-48ed-9cca-e5c56957cd63" in objectClicked.entity.getComponent('script_map').elements)){
                        takeControl(objectClicked,);
                    }
                } else if (objectClicked.entity.getComponent("debug_name").value === "Code") {
                    console.log("Is Lock")
                    showLock();

                }
            }
            else
            {
                console.log("Missed");
            }
        }

        // If an object was hit, duplicate it in a scaled verison, handleable by players
        // Camera work
        // Character work
    }, [takeControl, bluePrintInterract]);

  
    //------------------------------------------------------------------------------

    const InitFirstPersonController = useCallback(async (charCtlSceneUUID, spawnPosition) => {
        // To spawn an entity we need to create an EntityTempllate and specify the
        // components we want to attach to it. In this case we only want a scene_ref
        // that points to the character controller scene.
        console.log("Initiating First Person Controller Spawn")
        const playerTemplate = new SDK3DVerse.EntityTemplate();
        playerTemplate.attachComponent("scene_ref", { value: charCtlSceneUUID });
        playerTemplate.attachComponent("local_transform", { position: spawnPosition });

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
        SDK3DVerse.engineAPI.fireEvent("a25ea293-d682-45d3-962f-bd63e870a7d3", "call_constructor", [firstPersonController]);
        // We need to assign the current client to the first person controller
        // script which is attached to the firstPersonController entity.
        // This allows the script to know which client inputs it should read.
        SDK3DVerse.engineAPI.assignClientToScripts(firstPersonController);

        // Finally set the first person camera as the main camera.
        SDK3DVerse.setMainCamera(firstPersonCamera);
        window.clientController = firstPersonController;

        
        setIsLoading(false);
    }, [setIsLoading]);

    

    const initApp = useCallback(async () => {
        let canvas = document.getElementById("display-canvas");
        setIsLoading(true);
        // Join or start the session
        await SDK3DVerse.joinOrStartSession({
            userToken: userPublicToken,
            sceneUUID: mainSceneUUID,
            canvas: canvas,
            connectToEditor: true,
            startSimulation: "on-assets-loaded",
        });
        
        // Set the action map
        SDK3DVerse.actionMap.values["JUMP"] = [["KEY_32"]];
        SDK3DVerse.actionMap.propagate();

        // Lock the camera on mouse click
        canvas.addEventListener('mousedown', () => setPointerLock(canvas));
        
        await InitFirstPersonController(characterControllerSceneUUID, spawnPosition);

        canvas.addEventListener('click', (e) => focusObject(e, canvas));
        SDK3DVerse.engineAPI.registerToEvent("9e5e8313-b217-4c22-b00f-cf6ea44ec170", "log", callbackConsoleEvent);
        // Build the helicopter
        SDK3DVerse.engineAPI.registerToEvent("4ac15242-946d-4fec-8256-c516095969d2", "build", buildHelicopter);

        //setup enigma
        setTimeout(() => {setupEnigma(); SDK3DVerse.engineAPI.startSimulation()}, 1000);
    }, [InitFirstPersonController, setPointerLock, focusObject, buildHelicopter, setIsLoading, setupEnigma]);

    const setFPSCameraController = async (canvas) => {
        // Remove the required click for the LOOK_LEFT, LOOK_RIGHT, LOOK_UP, and 
        // LOOK_DOWN actions.
        SDK3DVerse.actionMap.values["LOOK_LEFT"][0] = ["MOUSE_AXIS_X_POS"];
        SDK3DVerse.actionMap.values["LOOK_RIGHT"][0] = ["MOUSE_AXIS_X_NEG"];
        SDK3DVerse.actionMap.values["LOOK_DOWN"][0] = ["MOUSE_AXIS_Y_NEG"];
        SDK3DVerse.actionMap.values["LOOK_UP"][0] = ["MOUSE_AXIS_Y_POS"];
        SDK3DVerse.actionMap.propagate();
    
        // Lock the mouse pointer
        canvas.requestPointerLock = (
            canvas.requestPointerLock 
            || canvas.mozRequestPointerLock 
            || canvas.webkitPointerLockElement
        );
        canvas.requestPointerLock({unadjustedMovement: true});
    };

    // Initialize the app when the page loads
    useEffect(() => {
        if (status === 'ready') {
            initApp();
        }
    }, [status, initApp]);

    return (
        <>
            <canvas
                id='display-canvas'
                style={{
                    height: '100vh',
                    width: '100vw',
                    verticalAlign: 'middle',
                }}
                tabIndex="1"
            ></canvas>
        </>
    );
};

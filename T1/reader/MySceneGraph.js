var DEGREE_TO_RAD = Math.PI / 180;

// Order of the groups in the XML document.
var SCENE_INDEX = 0;
var VIEWS_INDEX = 1;
var GLOBALS_INDEX = 2;
var LIGHTS_INDEX = 3;
var TEXTURES_INDEX = 4;
var MATERIALS_INDEX = 5;
var TRANSFORMATIONS_INDEX = 6;
var PRIMITIVES_INDEX = 7;
var COMPONENTS_INDEX = 8;

/**
 * MySceneGraph class, representing the scene graph.
 */
class MySceneGraph {
    /**
     * @constructor
     */
    constructor(filename, scene) {
        this.loadedOk = null;

        // Establish bidirectional references between scene and graph.
        this.scene = scene;
        scene.graph = this;

        this.nodes = [];

        this.idRoot = null;                    // The id of the root element.
        this.idView = null;                    // The id of the default view.

        this.materialRotate = 0;

        this.axisCoords = [];
        this.axisCoords['x'] = [1, 0, 0];
        this.axisCoords['y'] = [0, 1, 0];
        this.axisCoords['z'] = [0, 0, 1];


        // File reading 
        this.reader = new CGFXMLreader();

        /*
         * Read the contents of the xml file, and refer to this class for loading and error handlers.
         * After the file is read, the reader calls onXMLReady on this object.
         * If any error occurs, the reader calls onXMLError on this object, with an error message
         */
        this.reader.open('scenes/' + filename, this);
    }

    /*
     * Callback to be executed after successful reading
     */
    onXMLReady() {
        this.log("XML Loading finished.");
        var rootElement = this.reader.xmlDoc.documentElement;

        // Here should go the calls for different functions to parse the various blocks
        var error = this.parseXMLFile(rootElement);

        if (error != null) {
            this.onXMLError(error);
            return;
        }

        this.loadedOk = true;

        // As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
        this.scene.onGraphLoaded();
    }

    /**
     * Parses the XML file, processing each block.
     * @param {XML root element} rootElement
     */
    parseXMLFile(rootElement) {
        if (rootElement.nodeName != "lxs")
            return "root tag <lxs> missing";

        var nodes = rootElement.children;

        // Reads the names of the nodes to an auxiliary buffer.
        var nodeNames = [];

        for (var i = 0; i < nodes.length; i++) {
            nodeNames.push(nodes[i].nodeName);
        }

        var error;

        // Processes each node, verifying errors.

        // <scene>
        var index;
        if ((index = nodeNames.indexOf("scene")) == -1)
            return "tag <scene> missing";
        else {
            if (index != SCENE_INDEX)
                this.onXMLMinorError("tag <scene> out of order " + index);

            //Parse scene block
            if ((error = this.parseScene(nodes[index])) != null)
                return error;
        }

        // <views>
        if ((index = nodeNames.indexOf("views")) == -1)
            return "tag <views> missing";
        else {
            if (index != VIEWS_INDEX)
                this.onXMLMinorError("tag <views> out of order");

            //Parse views block
            if ((error = this.parseView(nodes[index])) != null)
                return error;
        }

        // <ambient>
        if ((index = nodeNames.indexOf("globals")) == -1)
            return "tag <globals> missing";
        else {
            if (index != GLOBALS_INDEX)
                this.onXMLMinorError("tag <globals> out of order");

            //Parse ambient block
            if ((error = this.parseGlobals(nodes[index])) != null)
                return error;
        }

        // <lights>
        if ((index = nodeNames.indexOf("lights")) == -1)
            return "tag <lights> missing";
        else {
            if (index != LIGHTS_INDEX)
                this.onXMLMinorError("tag <lights> out of order");

            //Parse lights block
            if ((error = this.parseLights(nodes[index])) != null)
                return error;
        }
        // <textures>
        if ((index = nodeNames.indexOf("textures")) == -1)
            return "tag <textures> missing";
        else {
            if (index != TEXTURES_INDEX)
                this.onXMLMinorError("tag <textures> out of order");

            //Parse textures block
            if ((error = this.parseTextures(nodes[index])) != null)
                return error;
        }

        // <materials>
        if ((index = nodeNames.indexOf("materials")) == -1)
            return "tag <materials> missing";
        else {
            if (index != MATERIALS_INDEX)
                this.onXMLMinorError("tag <materials> out of order");

            //Parse materials block
            if ((error = this.parseMaterials(nodes[index])) != null)
                return error;
        }

        // <transformations>
        if ((index = nodeNames.indexOf("transformations")) == -1)
            return "tag <transformations> missing";
        else {
            if (index != TRANSFORMATIONS_INDEX)
                this.onXMLMinorError("tag <transformations> out of order");

            //Parse transformations block
            if ((error = this.parseTransformations(nodes[index])) != null)
                return error;
        }

        // <primitives>
        if ((index = nodeNames.indexOf("primitives")) == -1)
            return "tag <primitives> missing";
        else {
            if (index != PRIMITIVES_INDEX)
                this.onXMLMinorError("tag <primitives> out of order");

            //Parse primitives block
            if ((error = this.parsePrimitives(nodes[index])) != null)
                return error;
        }

        // <components>
        if ((index = nodeNames.indexOf("components")) == -1)
            return "tag <components> missing";
        else {
            if (index != COMPONENTS_INDEX)
                this.onXMLMinorError("tag <components> out of order");

            //Parse components block
            if ((error = this.parseComponents(nodes[index])) != null)
                return error;
        }
        this.log("all parsed");
    }

    /**
     * Parses the <scene> block. 
     * @param {scene block element} sceneNode
     */
    parseScene(sceneNode) {

        // Get root of the scene.
        var root = this.reader.getString(sceneNode, 'root')
        if (root == null)
            return "no root defined for scene";

        this.idRoot = root;

        // Get axis length        
        var axis_length = this.reader.getFloat(sceneNode, 'axis_length');
        if (axis_length == null)
            this.onXMLMinorError("no axis_length defined for scene; assuming 'length = 1'");

        this.referenceLength = axis_length || 1;

        this.log("Parsed scene");

        return null;
    }

    /**
     * Parses the <views> block.
     * @param {view block element} viewsNode
     */
    parseView(viewsNode) {
        var children = viewsNode.children;
        var grandChildren = [];

        this.views = [];

        // Get id of the current view.
        this.idView = this.reader.getString(viewsNode, 'default');
        if (this.idView == null)
            return "no default ID defined for views";        

        for(var i = 0; i < children.length; i++){
            if (children[i].nodeName != "perspective") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current view.
            var viewID = this.reader.getString(children[i], 'id');
            if (viewID == null)
                return "no ID defined for perspective";

            // Checks for repeated IDs.
            if (this.views[viewID] != null)
                return "ID must be unique for each perspective (conflict: ID = " + viewID + ")";
            
            // Get near value of the current view.
            var near = this.reader.getFloat(children[i], 'near');
            if (near == null || isNaN(near) || near < 0)
                return "near value must be defined and higher then 0 for perspective with ID " + viewID;

            // Get far value of the current view.
            var far = this.reader.getFloat(children[i], 'far');
            if (far == null || isNaN(far) || far < 0)
                return "far value must be defined and higher then 0 for perspective with ID " + viewID;

            // Get angle value of the current view.
            var angle = this.reader.getInteger(children[i], 'angle');
            if (angle == null || isNaN(angle))
                return "angle value must be defined for perspective with ID " + viewID;

            grandChildren = children[i].children;

            var from;
            var to;

            for(var j = 0; j < grandChildren.length; j++){
                switch (grandChildren[j].nodeName) {
                    case 'from':
                        from = this.parseCoordinates3D(grandChildren[j], "from view for ID " + viewID);
                        if (!Array.isArray(from))
                            return from;    
                        break;

                    case 'to':
                        to = this.parseCoordinates3D(grandChildren[j], "to view for ID " + viewID);
                        if (!Array.isArray(to))
                            return to;    
                        break;
                    
                    default:
                        this.onXMLMinorError("unknown tag <" + grandchildren[j].nodeName + ">");
                        break;
                }
            }
            this.scene.viewsList.push(viewID);
            this.views[viewID] = new CGFcamera((angle/180) * Math.PI, near, far, from, to);
        }

        if(this.views[this.idView] == null)
            return "default view " + this.idView + " not found in views";

        this.scene.selectedCamera = this.idView;
        

        return null;
    }

    /**
     * Parses the <globals> node.
     * @param {globals block element} globalsNode
     */
    parseGlobals(globalsNode) {

        var children = globalsNode.children;

        this.ambient = [];
        this.background = [];

        var nodeNames = [];

        for (var i = 0; i < children.length; i++)
            nodeNames.push(children[i].nodeName);

        var ambientIndex = nodeNames.indexOf("ambient");
        var backgroundIndex = nodeNames.indexOf("background");

        var color = this.parseColor(children[ambientIndex], "ambient");
        if (!Array.isArray(color))
            return color;
        else
            this.ambient = color;

        color = this.parseColor(children[backgroundIndex], "background");
        if (!Array.isArray(color))
            return color;
        else
            this.background = color;

        this.log("Parsed globals");

        return null;
    }

    /**
     * Parses the <light> node.
     * @param {lights block element} lightsNode
     */
    parseLights(lightsNode) {
        var children = lightsNode.children;

        this.lights = [];
        var numLights = 0;

        var grandChildren = [];
        var nodeNames = [];

        // Any number of lights.
        for (var i = 0; i < children.length; i++) {

            // Storing light information
            var global = [];
            var attributeNames = [];
            var attributeTypes = [];

            //Check type of light
            if (children[i].nodeName != "omni" && children[i].nodeName != "spot") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }
            else {
                attributeNames.push(...["location", "ambient", "diffuse", "specular"]);
                attributeTypes.push(...["position", "color", "color", "color"]);
            }

            // Get id of the current light.
            var lightId = this.reader.getString(children[i], 'id');
            if (lightId == null)
                return "no ID defined for light";

            // Checks for repeated IDs.
            if (this.lights[lightId] != null)
                return "ID must be unique for each light (conflict: ID = " + lightId + ")";

            // Light enable/disable
            var enableLight = true;
            var aux = this.reader.getBoolean(children[i], 'enabled');
            if (!(aux != null && !isNaN(aux) && (aux == true || aux == false))){
                this.onXMLMinorError("unable to parse value component of the 'enable light' field for ID = " + lightId + "; assuming 'value = 1'");
                enableLight = 1;
            }

            enableLight = aux;

            //Add enabled boolean and type name to light info
            global.push(enableLight);
            global.push(children[i].nodeName);

            grandChildren = children[i].children;
            // Specifications for the current light.

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            for (var j = 0; j < attributeNames.length; j++) {
                var attributeIndex = nodeNames.indexOf(attributeNames[j]);

                if (attributeIndex != -1) {
                    if (attributeTypes[j] == "position")
                        var aux = this.parseCoordinates4D(grandChildren[attributeIndex], "light position for ID" + lightId);
                    else
                        var aux = this.parseColor(grandChildren[attributeIndex], attributeNames[j] + " illumination for ID" + lightId);

                    if (!Array.isArray(aux))
                        return aux;

                    global.push(aux);
                }
                else
                    return "light " + attributeNames[i] + " undefined for ID = " + lightId;
            }

            // Gets the additional attributes of the spot light
            if (children[i].nodeName == "spot") {
                var angle = this.reader.getFloat(children[i], 'angle');
                if (!(angle != null && !isNaN(angle)))
                    return "unable to parse angle of the light for ID = " + lightId;

                var exponent = this.reader.getFloat(children[i], 'exponent');
                if (!(exponent != null && !isNaN(exponent)))
                    return "unable to parse exponent of the light for ID = " + lightId;

                var targetIndex = nodeNames.indexOf("target");

                // Retrieves the light target.
                var targetLight = [];
                if (targetIndex != -1) {
                    var aux = this.parseCoordinates3D(grandChildren[targetIndex], "target light for ID " + lightId);
                    if (!Array.isArray(aux))
                        return aux;

                    targetLight = aux;
                }
                else
                    return "light target undefined for ID = " + lightId;
                

                var attenuationIndex = nodeNames.indexOf("attenuation");
                // Retrieves the light attenuation.
                var attenuation = [];
                if (attenuationIndex != -1) {
                    var constant = this.reader.getFloat(grandChildren[attenuationIndex], 'constant');
                    if(constant != 0 && constant != 1)
                        return "light attenuation constant must be defined and equal to 0 or 1 for light " + lightId;
                    var linear = this.reader.getFloat(grandChildren[attenuationIndex], 'linear');
                    if(linear != 0 && linear != 1)
                        return "light attenuation linear must be defined and equal to 0 or 1 for light " + lightId;
                    var quadratic = this.reader.getFloat(grandChildren[attenuationIndex], 'quadratic');
                    if(quadratic != 0 && quadratic != 1)
                        return "light attenuation quadratic must be defined and equal to 0 or 1 for light " + lightId;

                    if((quadratic + linear + constant) != 1)
                        return "light attenuation attributes must be 1 for light " + lightId;
                    
                    attenuation = [constant, linear, quadratic];
                }
                else
                    return "light attenuation undefined for ID = " + lightId;

                global.push(...[angle, exponent, targetLight, attenuation])
            }

            this.lights[lightId] = global;
            numLights++;
        }

        if (numLights == 0)
            return "at least one light must be defined";
        else if (numLights > 8)
            this.onXMLMinorError("too many lights defined; WebGL imposes a limit of 8 lights");

        this.log("Parsed lights");
        return null;
    }

    /**
     * Parses the <textures> block. 
     * @param {textures block element} texturesNode
     */
    parseTextures(texturesNode) {
        var children = texturesNode.children;
        this.textures = [];

        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "texture") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current texture.
            var textureID = this.reader.getString(children[i], 'id');
            if (textureID == null)
                return "no ID defined for texture";
            // Checks for repeated IDs.
            if (this.textures[textureID] != null)
                return "ID must be unique for each light (conflict: ID = " + textureID + ")";

            //Get file_name of texture
            var textureFile = this.reader.getString(children[i], 'file');
            if (textureFile == null)
                return "no file defined for texture";

            var texture = new CGFtexture(this.scene, textureFile);
            
            if (texture == null)
                return "texture file not found";
            
            this.textures[textureID] = texture;
        }
        this.log("Parsed textures");
        return null;

    }

    /**
     * Parses the <materials> node.
     * @param {materials block element} materialsNode
     */
    parseMaterials(materialsNode) {
        var children = materialsNode.children;
        this.materials = [];

        var grandChildren = [];
        var nodeNames = [];

        // Any number of materials.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "material") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current material.
            var materialID = this.reader.getString(children[i], 'id');
            if (materialID == null)
                return "no ID defined for material";
            // Checks for repeated IDs.
            if (this.materials[materialID] != null)
                return "ID must be unique for each material (conflict: ID = " + materialID + ")";

            // Shininess
            var materialShininess = this.reader.getFloat(children[i], 'shininess');
            if (materialShininess == null || materialShininess <= 0 || isNaN(materialShininess))
                return "Shininess value is incorrect";

            var grandChildren = children[i].children;

            //initialize all variables to be able to check them after cycle
            var emissionRGBA = null;
            var ambientRGBA = null;
            var diffuseRGBA = null;
            var specularRGBA = null;

            //check all children for incorrect tags
            for(var j = 0; j < grandChildren.length; j++){

                //Emission
                if (grandChildren[j].nodeName == "emission"){                   
                    emissionRGBA = this.parseColor(grandChildren[j], "emission");
                    //check parseColor return value, 4 values if correct
                    if(emissionRGBA.length != 4)
                        return emissionRGBA;
                }
                //Ambient
                else if (grandChildren[j].nodeName == "ambient"){
                    // var ambientIndex = nodeNames.indexOf("ambient");
                    // if (ambientIndex == -1)
                    
                    ambientRGBA = this.parseColor(grandChildren[j], "ambient");
                    if(ambientRGBA.length != 4)
                        return ambientRGBA;    
                }
                //Difuse
                else if (grandChildren[j].nodeName == "diffuse"){
                    // var diffuseIndex = nodeNames.indexOf("difuse");
                    // if (diffuseIndex == -1)
                    
                    diffuseRGBA = this.parseColor(grandChildren[j], "diffuse");
                    if(diffuseRGBA.length != 4)
                        return diffuseRGBA;    
                }
                //Specular
                else if (grandChildren[j].nodeName == "specular"){
                    // var specularIndex = nodeNames.indexOf("specular");
                    // if (specularIndex == -1)
                    
                    specularRGBA = this.parseColor(grandChildren[j], "specular");
                    if(specularRGBA.length != 4)
                        return specularRGBA;    
                }
                //Unknown tags
                else {
                    this.onXMLMinorError("unknown tag <" + grandChildren[j].nodeName + ">");
                    continue;
                }
                
            }
            //Check Variables
            if(emissionRGBA == null)
                return "Emission value indefined for material with ID = " + materialID;
            if(ambientRGBA == null)
                return "Ambient value indefined for material with ID = " + materialID;
            if(diffuseRGBA == null)
                return "Diffuse value indefined for material with ID = " + materialID;
            if(specularRGBA == null)
                return "Specular value indefined for material with ID = " + materialID;

            // Creates material with the lxs specifics
            var readMaterial = new CGFappearance(this.scene);
            readMaterial.setShininess(materialShininess);
            readMaterial.setAmbient(ambientRGBA[0], ambientRGBA[1], ambientRGBA[2], ambientRGBA[3]);
            readMaterial.setDiffuse(diffuseRGBA[0], diffuseRGBA[1], diffuseRGBA[2], diffuseRGBA[3]);
            readMaterial.setSpecular(specularRGBA[0], specularRGBA[1], specularRGBA[2], specularRGBA[3]);
            readMaterial.setEmission(emissionRGBA[0], emissionRGBA[1], emissionRGBA[2], emissionRGBA[3]);
            this.materials[materialID] = readMaterial;
        }
        this.log("Parsed materials");
        return null;
    }

    /**
     * Parses the <transformations> block.
     * @param {transformations block element} transformationsNode
     */
    //BASED ON: http://glmatrix.net/docs/module-mat4.html
    parseTransformations(transformationsNode) {
        var children = transformationsNode.children;
        var grandChildren = [];

        this.transformations = [];

        // Any number of transformations.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "transformation") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current transformation.
            var transformationID = this.reader.getString(children[i], 'id');
            if (transformationID == null)
                return "no ID defined for transformation";

            // Checks for repeated IDs.
            if (this.transformations[transformationID] != null)
                return "ID must be unique for each transformation (conflict: ID = " + transformationID + ")";

            grandChildren = children[i].children;
            // Specifications for the current transformation.

            var transfMatrix = mat4.create();

            for (var j = 0; j < grandChildren.length; j++) {
                switch (grandChildren[j].nodeName) {
                    case 'translate':
                        var coordinates = this.parseCoordinates3D(grandChildren[j], "translate transformation for ID " + transformationID);
                        if (!Array.isArray(coordinates))
                            return coordinates;

                        transfMatrix = mat4.translate(transfMatrix, transfMatrix, coordinates);
                        break;

                    case 'scale':                        
                        var coordinates = this.parseCoordinates3D(grandChildren[j], "scale transformation for ID " + transformationID);
                        if (!Array.isArray(coordinates))
                            return coordinates;

                        transfMatrix = mat4.scale(transfMatrix, transfMatrix, coordinates);
                        break;
                        
                    case 'rotate':
                        var angle = this.reader.getFloat(grandChildren[j], "angle");
                        if (angle == null || isNaN(angle))
                            return "unable to parse angle of rotation of " + transformationID;
                        var axis = this.reader.getString(grandChildren[j], "axis");
                        switch (axis) {
                            case 'x':
                                transfMatrix = mat4.rotate(transfMatrix, transfMatrix, angle*Math.PI/180, vec3.fromValues(1, 0, 0)); //rotate(out, a, rad, axis)                                
                                break;
                            case 'y':
                                transfMatrix = mat4.rotate(transfMatrix, transfMatrix, angle*Math.PI/180, vec3.fromValues(0, 1, 0)); //rotate(out, a, rad, axis)                                
                                break;
                            case 'z':
                                transfMatrix = mat4.rotate(transfMatrix, transfMatrix, angle*Math.PI/180, vec3.fromValues(0, 0, 1)); //rotate(out, a, rad, axis)                                
                                break;
                            default:
                                return "unable to parse axis of rotation of " + transformationID;
                        }    
                        break;

                    default:
                        return "unknown tag <" + grandChildren[j].nodeName + ">";
                }
            }
            this.transformations[transformationID] = transfMatrix;
        }

        this.log("Parsed transformations");
        return null;
    }

    /**
     * Parses the <primitives> block.
     * @param {primitives block element} primitivesNode
     */
    parsePrimitives(primitivesNode) {
        var children = primitivesNode.children;

        this.primitives = [];

        var grandChildren = [];

        // Any number of primitives.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "primitive") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current primitive.
            var primitiveId = this.reader.getString(children[i], 'id');
            if (primitiveId == null)
                return "no ID defined for texture";
            // Checks for repeated IDs.
            if (this.primitives[primitiveId] != null)
                return "ID must be unique for each primitive (conflict: ID = " + primitiveId + ")";

            grandChildren = children[i].children;
            
            // Specifications for the current primitive.
            var primitiveType = grandChildren[0].nodeName;

            // Validate the primitive type
            if (grandChildren.length != 1 ||
                (primitiveType != 'rectangle' && primitiveType != 'triangle' &&
                    primitiveType != 'cylinder' && primitiveType != 'sphere' &&
                    primitiveType != 'torus')) {
                return "There must be exactly 1 primitive type (rectangle, triangle, cylinder, sphere or torus)"
            }

            // Retrieves the primitive coordinates.
            if (primitiveType == 'rectangle') {
                // x1
                var x1 = this.reader.getFloat(grandChildren[0], 'x1');
                if (!(x1 != null && !isNaN(x1)))
                    return "unable to parse x1 of the primitive coordinates for ID = " + primitiveId;

                // y1
                var y1 = this.reader.getFloat(grandChildren[0], 'y1');
                if (!(y1 != null && !isNaN(y1)))
                    return "unable to parse y1 of the primitive coordinates for ID = " + primitiveId;

                // x2
                var x2 = this.reader.getFloat(grandChildren[0], 'x2');
                if (!(x2 != null && !isNaN(x2) && x2 > x1))
                    return "unable to parse x2 of the primitive coordinates for ID = " + primitiveId;

                // y2
                var y2 = this.reader.getFloat(grandChildren[0], 'y2');
                if (!(y2 != null && !isNaN(y2) && y2 > y1))
                    return "unable to parse y2 of the primitive coordinates for ID = " + primitiveId;

                var rect = new MyRectangle(this.scene, x1, x2, y1, y2);
                this.primitives[primitiveId] = rect;
            }
            else if (primitiveType == 'triangle') {
                // x1
                var x1 = this.reader.getFloat(grandChildren[0], 'x1');
                if (!(x1 != null && !isNaN(x1)))
                    return "unable to parse x1 of the primitive coordinates for ID = " + primitiveId;

                // y1
                var y1 = this.reader.getFloat(grandChildren[0], 'y1');
                if (!(y1 != null && !isNaN(y1)))
                    return "unable to parse y1 of the primitive coordinates for ID = " + primitiveId;

                // z1
                var z1 = this.reader.getFloat(grandChildren[0], 'z1');
                if (!(z1 != null && !isNaN(z1)))
                    return "unable to parse z1 of the primitive coordinates for ID = " + primitiveId;

                // x2
                var x2 = this.reader.getFloat(grandChildren[0], 'x2');
                if (!(x2 != null && !isNaN(x2)))
                    return "unable to parse x2 of the primitive coordinates for ID = " + primitiveId;
                    
                // y2
                var y2 = this.reader.getFloat(grandChildren[0], 'y2');
                if (!(y2 != null && !isNaN(y2)))
                    return "unable to parse y2 of the primitive coordinates for ID = " + primitiveId;

                // z2
                var z2 = this.reader.getFloat(grandChildren[0], 'z2');
                if (!(z2 != null && !isNaN(z2)))
                    return "unable to parse z2 of the primitive coordinates for ID = " + primitiveId;

                // x3
                var x3 = this.reader.getFloat(grandChildren[0], 'x3');
                if (!(x3 != null && !isNaN(x3)))
                    return "unable to parse x3 of the primitive coordinates for ID = " + primitiveId;

                // y3
                var y3 = this.reader.getFloat(grandChildren[0], 'y3');
                if (!(y3 != null && !isNaN(y3)))
                    return "unable to parse y3 of the primitive coordinates for ID = " + primitiveId;

                // z3
                var z3 = this.reader.getFloat(grandChildren[0], 'z3');
                if (!(z3 != null && !isNaN(z3)))
                    return "unable to parse z3 of the primitive coordinates for ID = " + primitiveId;

                var tri = new MyTriangle(this.scene, primitiveId, x1, x2, x3, y1, y2, y3, z1, z2, z3);
                this.primitives[primitiveId] = tri;
            }
            else if (primitiveType == 'cylinder') {
                // base
                var base = this.reader.getFloat(grandChildren[0], 'base');
                if (!(base != null && !isNaN(base) && base>=0))
                    return "unable to parse base of the primitive coordinates for ID = " + primitiveId;

                // top
                var top = this.reader.getFloat(grandChildren[0], 'top');
                if (!(top != null && !isNaN(top)  && top>=0))
                    return "unable to parse top of the primitive coordinates for ID = " + primitiveId;

                // height
                var height = this.reader.getFloat(grandChildren[0], 'height');
                if (!(height != null && !isNaN(height) && height>=0))
                    return "unable to parse height of the primitive coordinates for ID = " + primitiveId;

                // slices
                var slices = this.reader.getInteger(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(slices) && slices>0))
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;
                
                // stacks
                var stacks = this.reader.getInteger(grandChildren[0], 'stacks');
                if (!(stacks != null && !isNaN(stacks) && stacks>0))
                    return "unable to parse stacks of the primitive coordinates for ID = " + primitiveId;

                var cyl = new MyCylinder(this.scene, base, top, height, slices, stacks);
                this.primitives[primitiveId] = cyl;
            }
            else if (primitiveType == 'sphere') {
                // radius
                var radius = this.reader.getFloat(grandChildren[0], 'radius');
                if (radius == null || isNaN(radius) || radius < 0)
                    return "unable to parse radius of the primitive coordinates for ID = " + primitiveId;

                // slices
                var slices = this.reader.getInteger(grandChildren[0], 'slices');
                if (slices == null || isNaN(slices) || slices <=0)
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;

                // stacks
                var stacks = this.reader.getInteger(grandChildren[0], 'stacks');
                if (stacks == null || isNaN(stacks) || stacks <=0)
                    return "unable to parse stacks of the primitive coordinates for ID = " + primitiveId;

                var sphere = new MySphere(this.scene, radius, slices, stacks);
                this.primitives[primitiveId] = sphere;
            }
            else if (primitiveType == 'torus') {
                // inner
                var inner = this.reader.getFloat(grandChildren[0], 'inner');
                if (!(inner != null && !isNaN(inner) && inner>0))
                    return "unable to parse inner of the primitive coordinates for ID = " + primitiveId;

                // outer
                var outer = this.reader.getFloat(grandChildren[0], 'outer');
                if (!(outer != null && !isNaN(outer) && outer>0))
                    return "unable to parse outer of the primitive coordinates for ID = " + primitiveId;

                // slices
                var slices = this.reader.getInteger(grandChildren[0], 'slices');
                if (!(slices != null && !isNaN(slices) && slices>0))
                    return "unable to parse slices of the primitive coordinates for ID = " + primitiveId;

                // loops
                var loops = this.reader.getInteger(grandChildren[0], 'loops');
                if (!(loops != null && !isNaN(loops) && loops > 0))
                    return "unable to parse loops of the primitive coordinates for ID = " + primitiveId;

                var torus = new MyTorus(this.scene, slices, inner, outer, loops);
                this.primitives[primitiveId] = torus;
            }
        }
        this.log("Parsed primitives");
        return null;
    }


    /**
   * Parses the <components> block.
   * @param {components block element} componentsNode
   */
    parseComponents(componentsNode) {
        var children = componentsNode.children;

        this.components = [];

        var grandChildren = [];
        var grandgrandChildren = [];
        var nodeNames = [];

        // Any number of components.
        for (var i = 0; i < children.length; i++) {

            if (children[i].nodeName != "component") {
                this.onXMLMinorError("unknown tag <" + children[i].nodeName + ">");
                continue;
            }

            // Get id of the current component.
            var componentID = this.reader.getString(children[i], 'id');
            if (componentID == null)
                return "no ID defined for componentID";

            // Checks for repeated IDs.
            if (this.components[componentID] != null)
                return "ID must be unique for each component (conflict: ID = " + componentID + ")";

            // Floor Number
            var componentFloor = 0;
            componentFloor = this.reader.getInteger(children[i], 'floor', false);
            if (componentFloor == null)
                componentFloor = 0;
            if (componentFloor < 0)
                this.onXMLMinorError("floor number of component " + componentID + " must be 0 or higher, set to 0");
    
            grandChildren = children[i].children;

            nodeNames = [];
            for (var j = 0; j < grandChildren.length; j++) {
                nodeNames.push(grandChildren[j].nodeName);
            }

            
            var transformationIndex = nodeNames.indexOf("transformation");
            var materialsIndex = nodeNames.indexOf("materials");
            var textureIndex = nodeNames.indexOf("texture");
            var childrenIndex = nodeNames.indexOf("children");

            // Transformations
            var transfMatrix;
            grandgrandChildren = grandChildren[transformationIndex].children;

            if(grandgrandChildren.length == 1 && grandgrandChildren[0].nodeName == 'transformationref'){
                let matrixID = this.reader.getString(grandgrandChildren[0], "id");
                if(matrixID == null || this.transformations[matrixID] == null)
                    return "unable to parse transformation id of " + componentID;

                transfMatrix = this.transformations[matrixID];
            }
            else {
                transfMatrix = mat4.create();
                for (var j = 0; j < grandgrandChildren.length; j++) {
                    switch (grandgrandChildren[j].nodeName) {
                        case 'translate':
                            var coordinates = this.parseCoordinates3D(grandgrandChildren[j], "translate transformation for ID " + componentID);
                            if (!Array.isArray(coordinates))
                                return coordinates;

                            transfMatrix = mat4.translate(transfMatrix, transfMatrix, coordinates);
                            break;

                        case 'scale':                        
                            var coordinates = this.parseCoordinates3D(grandgrandChildren[j], "scale transformation for ID " + componentID);
                            if (!Array.isArray(coordinates))
                                return coordinates;

                            transfMatrix = mat4.scale(transfMatrix, transfMatrix, coordinates);
                            break;
                            
                        case 'rotate':
                            var angle = this.reader.getFloat(grandgrandChildren[j], "angle");
                            if (angle == null || isNaN(angle))
                                return "unable to parse angle of rotation of " + componentID;
                            var axis = this.reader.getString(grandgrandChildren[j], "axis");
                            switch (axis) {
                                case 'x':
                                    transfMatrix = mat4.rotate(transfMatrix, transfMatrix, angle*Math.PI/180, vec3.fromValues(1, 0, 0)); //rotate(out, a, rad, axis)                                
                                    break;
                                case 'y':
                                    transfMatrix = mat4.rotate(transfMatrix, transfMatrix, angle*Math.PI/180, vec3.fromValues(0, 1, 0)); //rotate(out, a, rad, axis)                                
                                    break;
                                case 'z':
                                    transfMatrix = mat4.rotate(transfMatrix, transfMatrix, angle*Math.PI/180, vec3.fromValues(0, 0, 1)); //rotate(out, a, rad, axis)                                
                                    break;
                                default:
                                    return "unable to parse axis of rotation of " + componentID;
                            }    
                            break;

                        default:
                            return "incorrect tag <" + grandgrandChildren[j].nodeName + ">";
                    }
                }
            }
            // Materials
            var materials = [];

            if(grandChildren[materialsIndex] == null)
                return "component " + componentID + " must have materials defined";
            
            grandgrandChildren = grandChildren[materialsIndex].children;
            for (var j = 0; j < grandgrandChildren.length; j++) {
                var materialID = this.reader.getString(grandgrandChildren[j], "id");
                if (materialID == null)
                    return "no ID defined for material in component " + componentID;
                if (this.materials[materialID] == null && materialID != 'inherit')
                    return "material with ID " + materialID + " must be defined in materials"
                materials.push(materialID);
            }
            
            // Texture
            var texture = {
                id: 'none',
                length_s: 0,
                length_t: 0
            };
            texture.id = this.reader.getString(grandChildren[textureIndex], "id");
            if (texture.id == null){
                this.onXMLMinorError("no ID defined for texture in component " + componentID + " assuming no texture");
                texture.id = 'none';
            }
            else if (this.textures[texture.id] == null && texture.id != 'none' && texture.id != 'inherit')
                return "texture with ID " + texture.id + " must be defined in textures";
            
            if(texture.id != 'none' && texture.id != 'inherit'){
                texture.length_s = this.reader.getFloat(grandChildren[textureIndex], "length_s", false);
                if (isNaN(texture.length_s) || texture.length_s == null){
                    this.onXMLMinorError("no length_s defined for texture " + texture.id + " in component " + componentID + " assuming default value (0)");
                    texture.length_s = 0;
                }
    
                texture.length_t = this.reader.getFloat(grandChildren[textureIndex], "length_t", false);
                if (isNaN(texture.length_t) || texture.length_t == null){
                    this.onXMLMinorError("no length_t defined for texture " + texture.id + " in component " + componentID + " assuming default value (0)");
                    texture.length_t = 0;
                }

                if ( (texture.length_s == 0 && texture.length_t != 0) || (texture.length_s == 0 && texture.length_t != 0) ) 
                    return "length_s and length_t must be both higher or equal to 0 in component " + componentID;
                
            }
            else{
                texture.length_s = this.reader.getFloat(grandChildren[textureIndex], "length_s", false);
                texture.length_t = this.reader.getFloat(grandChildren[textureIndex], "length_t", false);
                if(texture.length_t != null || texture.length_s != null) 
                    this.onXMLMinorError("length_s and length_t must not be defined in texture in component " + componentID);
            } 

            // Children
            var components = [];
            var primitives = [];
            grandgrandChildren = grandChildren[childrenIndex].children;
            
            for (var j = 0; j < grandgrandChildren.length; j++){
                if(grandgrandChildren[j].nodeName == "componentref"){
                    var compID;
                    compID = this.reader.getString(grandgrandChildren[j], "id");
                    if (compID == null)
                        return "no ID defined for component children in component " + componentID;
                    if (this.components[compID] == null)
                        return "component with ID " + compID + " must be defined in components";
                    components.push(compID);
                }
                else if(grandgrandChildren[j].nodeName == "primitiveref"){
                    var primitiveID;
                    primitiveID = this.reader.getString(grandgrandChildren[j], "id");
                    if (primitiveID == null)
                        return "no ID defined for primitive children in component " + componentID;
                    if (this.primitives[primitiveID] == null)
                        return "primitive with ID " + primitiveID + " must be defined in components";
                    primitives.push(primitiveID);
                }
                else
                    this.onXMLMinorError("unknown tag <" + grandgrandChildren[j].nodeName + ">");
            }
            
            if ( (components.length + primitives.length) <= 0)
                return "component " + componentID + " must have at least 1 child";
                
            if(componentFloor > this.scene.floorMax)
                this.scene.floorMax = componentFloor;

            var component = {
                floor: componentFloor,
                transfMatrix: transfMatrix, 
                materials: materials, 
                texture: texture, 
                childComponents: components, 
                childPrimitives: primitives};
            this.components[componentID] = component;
        }

        if(this.components[this.idRoot] == null)
            return "component root " + this.idRoot + " not found in components";

        this.log("Parsed components");
        return null;
    }


    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    //BASED ON: http://glmatrix.net/docs/module-mat4.html
    parseCoordinates3D(node, messageError) {
        var position = [];

        // x
        var x = this.reader.getFloat(node, 'x');
        if (!(x != null && !isNaN(x)))
            return "unable to parse x-coordinate of the " + messageError;

        // y
        var y = this.reader.getFloat(node, 'y');
        if (!(y != null && !isNaN(y)))
            return "unable to parse y-coordinate of the " + messageError;

        // z
        var z = this.reader.getFloat(node, 'z');
        if (!(z != null && !isNaN(z)))
            return "unable to parse z-coordinate of the " + messageError;

        position.push(...[x, y, z]);
        return position;
    }

    /**
     * Parse the coordinates from a node with ID = id
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseCoordinates4D(node, messageError) {
        var position = [];

        //Get x, y, z
        position = this.parseCoordinates3D(node, messageError);

        if (!Array.isArray(position))
            return position;


        // w
        var w = this.reader.getFloat(node, 'w');
        if (!(w != null && !isNaN(w)))
            return "unable to parse w-coordinate of the " + messageError;

        position.push(w);

        return position;
    }

    /**
     * Parse the color components from a node
     * @param {block element} node
     * @param {message to be displayed in case of error} messageError
     */
    parseColor(node, messageError) {
        var color = [];

        // R
        var r = this.reader.getFloat(node, 'r');
        if (!(r != null && !isNaN(r) && r >= 0 && r <= 1))
            return "unable to parse R component of the " + messageError;

        // G
        var g = this.reader.getFloat(node, 'g');
        if (!(g != null && !isNaN(g) && g >= 0 && g <= 1))
            return "unable to parse G component of the " + messageError;

        // B
        var b = this.reader.getFloat(node, 'b');
        if (!(b != null && !isNaN(b) && b >= 0 && b <= 1))
            return "unable to parse B component of the " + messageError;

        // A
        var a = this.reader.getFloat(node, 'a');
        if (!(a != null && !isNaN(a) && a >= 0 && a <= 1))
            return "unable to parse A component of the " + messageError;

        color.push(...[r, g, b, a]);

        return color;
    }

    /*
     * Callback to be executed on any read error, showing an error on the console.
     * @param {string} message
     */
    onXMLError(message) {
        console.error("XML Loading Error: " + message);
        this.loadedOk = false;
    }

    /**
     * Callback to be executed on any minor error, showing a warning on the console.
     * @param {string} message
     */
    onXMLMinorError(message) {
        console.warn("Warning: " + message);
    }

    /**
     * Callback to be executed on any message.
     * @param {string} message
     */
    log(message) {
        console.log("   " + message);
    }

    /**
     * Processes Nodes Recursively
     */
    processComponentNode(id, matrix, material, texture, length_s, length_t){
        if(this.components[id] == null){
            this.onXMLError(id + " not found in components");
            return;
        }

        let node = this.components[id];

        if(node.floor > this.scene.floor)
            return;

        //get material
        if(node.materials[this.materialRotate % node.materials.length] != "inherit")
            material = node.materials[this.materialRotate % node.materials.length];

        //get texture
        if(node.texture.id != "inherit"){
            texture = node.texture.id;
            length_s = node.texture.length_s;
            length_t = node.texture.length_t;
        }

        //Compute transformation matrix
        mat4.mul(matrix, matrix, node.transfMatrix);        

        //process all children components
        for(let i = 0; i < node.childComponents.length; i++){
            this.processComponentNode(node.childComponents[i], mat4.clone(matrix), material, texture, length_s, length_t);
        }

        //process all children primitives
        for(let i = 0; i < node.childPrimitives.length; i++){
            this.scene.pushMatrix();

            //change texture
            if(texture != "none"){
                this.materials[material].setTexture(this.textures[texture]);
                this.primitives[node.childPrimitives[i]].updateTexCoords(length_s, length_t);
            }
            else{
                this.materials[material].setTexture(null);
            }
            
            //apply material
            this.materials[material].apply();

            //apply transformation matrix
            this.scene.multMatrix(matrix);

            //draw primitive
            this.primitives[node.childPrimitives[i]].display();

            this.scene.popMatrix();
        }
    }

    /**
     * Displays the scene, processing each node, starting in the root node.
     */
    displayScene() {
        this.processComponentNode(this.idRoot, mat4.create(), "", "none", 1, 1);
    }
}

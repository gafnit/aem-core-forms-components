/*******************************************************************************
 * Copyright 2023 Adobe
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/
(function(author){

    "use strict";
    /**
     * Adds the toolbar component as a child of the panel 
     * @param {Object} component The component that has to be instantiated
     */
     window.CQ.FormsCoreComponents.editorhooks.addPanelToolbar = function (panel) {
        if(!containsToolbarChild(panel)) {
            console.log(panel);
            /*
            let toolbarJson = {
                'sling:resourceType'    :   'forms-components-examples/components/form/toolbar',
                'jcr:title'             :   'Toolbar',
                'name'                  :   'toolbar'
            }
            */

            // fetch cq:template toolbarJson

            let toolbarJson = $.ajax({
                type: 'GET',
                url : '/apps/forms-components-examples/components/form/toolbar/cq:template.-1.json',
                async: false
            }).responseJSON;

            const options = {
                ':content' : JSON.stringify(toolbarJson),
                ':operation' : 'import',
                ':contentType' : 'json',
                ':replace' : true,
                ':replaceProperties' : true
            };

            // const options = {
            //     './@CopyFrom' : '/apps/forms-components-examples/components/toolbar/cq:template',
            //     './sling:resourceType' : 'forms-components-examples/components/form/toolbar'
            // };

            let result = $.ajax({
                type: 'POST',
                async: false,
                data: options,
                url: Granite.HTTP.externalize(panel.path + "/toolbar")
            }).done(() => {
                panel.refresh();
            });
        } 
    };

    const containsToolbarChild = function (panel) {
        return panel.getChildren().some(child => child.getNodeName() === 'toolbar');
    }
    
})(Granite.author);

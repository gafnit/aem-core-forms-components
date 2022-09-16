/*
 *  Copyright 2022 Adobe Systems Incorporated
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


const commons = require('../libs/commons/commons'),
    sitesSelectors = require('../libs/commons/sitesSelectors'),
    sitesConstants = require('../libs/commons/sitesConstants'),
    guideSelectors = require('../libs/commons/guideSelectors'),
    afConstants = require('../libs/commons/formsConstants');

/**
 * Testing Footer with Sites Editor
 */
describe('Page - Authoring', function () {
  // we can use these values to log in

  const dropFooterInContainer = function() {
    const responsiveGridDropZone = "Drag components here", // todo:  need to localize this
        responsiveGridDropZoneSelector = sitesSelectors.overlays.overlay.component + "[data-text='" + responsiveGridDropZone + "']";
    cy.selectLayer("Edit");
    cy.insertComponent(responsiveGridDropZoneSelector, "Footer", afConstants.components.forms.resourceType.footer);
    cy.get('body').click( 0,0);
  }

  const dropFooterInSites = function() {
    const dataPath = "/content/core-components-examples/library/adaptive-form/footer/jcr:content/root/responsivegrid/demo/component/container/*",
        responsiveGridDropZoneSelector = sitesSelectors.overlays.overlay.component + "[data-path='" + dataPath + "']";
    cy.selectLayer("Edit");
    cy.insertComponent(responsiveGridDropZoneSelector, "Footer", afConstants.components.forms.resourceType.footer);
    cy.get('body').click( 0,0);
  }

  const testFooterBehaviour = function(imageEditPathSelector, imageDrop, isSites) {
    if (isSites) {
      dropFooterInSites();
    } else {
      dropFooterInContainer();
    }
//    cy.openEditableToolbar(sitesSelectors.overlays.overlay.component + imageEditPathSelector);
//    cy.invokeEditableAction("[data-action='CONFIGURE']"); // this line is causing frame busting which is causing cypress to fail
    cy.deleteComponentByPath(imageDrop);
  }

  context('Open Forms Editor', function() {
    const pagePath = "/content/forms/af/core-components-it/blank",
        footerEditPath = pagePath + afConstants.FORM_EDITOR_FORM_CONTAINER_SUFFIX + "/footer",
        footerEditPathSelector = "[data-path='" + footerEditPath + "']",
        footerDrop = pagePath + afConstants.FORM_EDITOR_FORM_CONTAINER_SUFFIX + "/" + afConstants.components.forms.resourceType.footer.split("/").pop();
    beforeEach(function () {
      // this is done since cypress session results in 403 sometimes
      cy.openAuthoring(pagePath);
    });

    it('insert Footer in form container', function () {
      dropFooterInContainer();
      cy.deleteComponentByPath(footerDrop);
    });

    it ('open edit dialog of Footer', function(){
      testFooterBehaviour(footerEditPathSelector, footerDrop);
    })
  })

//  context('Open Sites Editor', function () {
//    const   pagePath = "/content/core-components-examples/library/adaptive-form/footer",
//        imageEditPath = pagePath + afConstants.RESPONSIVE_GRID_DEMO_SUFFIX + "/container/footer",
//        imageEditPathSelector = "[data-path='" + imageEditPath + "']",
//        imageDrop = pagePath + afConstants.RESPONSIVE_GRID_DEMO_SUFFIX + '/container/' + afConstants.components.forms.resourceType.formimage.split("/").pop();
//
//    beforeEach(function () {
//      // this is done since cypress session results in 403 sometimes
//      cy.openAuthoring(pagePath);
//    });
//
//    it('insert aem forms Footer', function () {
//      dropFooterInSites();
//      cy.deleteComponentByPath(imageDrop);
//    });
//
//    it('open edit dialog of aem forms Footer', function() {
//      testFooterBehaviour(imageEditPathSelector, imageDrop, true);
//    });
//
//  });
});
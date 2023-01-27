/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2022 Adobe
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
package com.adobe.cq.forms.core.components.models.form;

import org.osgi.annotation.versioning.ProviderType;

/**
 * Defines the {@code FormStructureParser} Sling Model to access the form container path from page or any child.
 *
 * @since com.adobe.cq.forms.core.components.models.form 2.0.0
 */
@ProviderType
public interface FormStructureParser {

    /**
     *
     * @returns the path of the form container in which the component is there
     */
    String getFormContainerPath();

    /**
     *
     * @returns reference to the client lib stored in the form container
     */
    String getClientLibRefFromFormContainer();

    /**
     * @returns reference to theme client lib stored in the form container
     */
    String getThemeClientLibRefFromFormContainer();

}

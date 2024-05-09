/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2024 Adobe
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

package com.adobe.cq.forms.core.components.internal.models.v1.form;

import java.util.*;

import org.apache.sling.api.resource.Resource;
import org.apache.sling.api.resource.ValueMap;
import org.apache.sling.models.annotations.Exporter;
import org.apache.sling.models.annotations.Model;
import org.apache.sling.models.annotations.injectorspecific.InjectionStrategy;
import org.apache.sling.models.annotations.injectorspecific.ValueMapValue;

import com.adobe.cq.export.json.ExporterConstants;

@Model(adaptables = Resource.class)
@Exporter(name = ExporterConstants.SLING_MODEL_EXPORTER_NAME, extensions = ExporterConstants.SLING_MODEL_EXTENSION)
public class SignerInfoImpl {

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL, name = "firstSignerFormFiller")
    private static String firstSignerFormFiller;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL, name = "workflowType")
    private static String workflowType;

    @ValueMapValue(injectionStrategy = InjectionStrategy.OPTIONAL, name = "fd:signerInfo")
    private Resource signerInfoResource;

    public static Map<String, Object> getSignerDetails(Resource signerInfoResource) {
        Map<String, Object> signerProperties = new LinkedHashMap<>();
        ValueMap signerInfoMap = signerInfoResource.getValueMap();
        signerProperties.put("firstSignerFormFiller", signerInfoMap.get("firstSignerFormFiller"));
        signerProperties.put("workflowType", signerInfoMap.get("workflowType"));
        if (signerInfoResource.hasChildren()) {
            Iterator<Resource> iterator = signerInfoResource.getChildren().iterator();
            List<Map<String, Object>> signersList = new ArrayList<>();

            while (iterator.hasNext()) {
                Resource signerFieldResource = iterator.next();
                SignerInfoFieldImpl signerInfo = signerFieldResource.adaptTo(SignerInfoFieldImpl.class);
                if (signerInfo != null) {
                    Map<String, Object> signerFieldMap = signerInfo.getSignerFieldMap();
                    signersList.add(signerFieldMap);
                }
            }
            signerProperties.put("signers", signersList);
        }
        return signerProperties;
    }

}

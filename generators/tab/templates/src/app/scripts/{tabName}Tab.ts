// Copyright (c) Wictor Wilén. All rights reserved. 
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { TeamsTheme } from './theme';

/**
 * Implementation of the <%= tabTitle %> content page
 */
export class <%=tabName%>Tab {
    /**
     * Constructor for <%= tabName %> that initializes the Microsoft Teams script and themes management
     */
    constructor() {
        microsoftTeams.initialize();
        TeamsTheme.fix();
    }
    /**
     * Method to invoke on page to start processing
     * Add your custom implementation here
     */
    public doStuff() {
        microsoftTeams.getContext((context: microsoftTeams.Context) => {
            let element = document.getElementById('app');
            if (element) {
                element.innerHTML = `The value is: ${context.entityId}`;
            }
        });
    }
}
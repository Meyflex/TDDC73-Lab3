export type Repository = {
    id: number;
    name: string;
    forks_count: number;
    stargazers_count: number;
    html_url: string;
    description: string;
    full_name: string;
    license?: License;
};

export type License = {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
};

export type ApiResponse = {
    total_count: number;
    incomplete_results: boolean;
    items: Repository[];
};

export type RootStackParamList = {
    Home: undefined;
    Details: { repository: Repository }; // Define parameters for the Details screen
};

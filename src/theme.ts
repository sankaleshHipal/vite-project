export interface ThemeSettings {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
}

class ThemeService {
    constructor( themes: ThemeSettings) {
        this.applyTheme(themes);
    }

    private applyTheme(themes: ThemeSettings): void {
        const root = document.documentElement;
        root.style.setProperty('--primary-color', themes.primaryColor);
        root.style.setProperty('--secondary-color', themes.secondaryColor);
        root.style.setProperty('--accent-color', themes.accentColor);
    }

    public updateTheme(newThemes: ThemeSettings): void {
        this.applyTheme(newThemes);
    }
}

export default ThemeService;

import { Drawing } from './Drawing';
import { MainCanvas } from './canvas/MainCanvas';
import { Control } from './util/Control';

class Main {
    public static run(): void {
        Control.setupInitialProperties();

        MainCanvas.create();
        Drawing.setup();

    }
}

Main.run()
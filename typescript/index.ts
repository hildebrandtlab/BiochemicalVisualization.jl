import r2wc from "@r2wc/react-to-web-component"
import SceneComponent from './SceneComponent';
import '@webcomponents/custom-elements';

const SceneWebComponent = r2wc(SceneComponent, {
    props: {
        id: "string"
    }
});

customElements.define('bv-scene', SceneWebComponent);

export {
    SceneWebComponent
}

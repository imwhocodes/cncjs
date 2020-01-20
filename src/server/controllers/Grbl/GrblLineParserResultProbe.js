class GrblLineParserResultProbe {
    static parse(line) {
        const r = line.match(/^\[(PRB):(.+)\]$/);
        if (!r) {
            return null;
        }

        const name = r[1];
        const value = r[2];
        const payload = {
            name: name,
            value: ''
        };

        // [PRB:0.000,0.000,1.492:1]
        if (name === 'PRB') {
            const axes = ['x', 'y', 'z', 'a', 'b', 'c'];
            const [str, result] = value.split(':');
            const list = str.split(',');
            payload.value = {};
            payload.value.result = Number(result);
            for (let i = 0; i < list.length; ++i) {
                payload.value[axes[i]] = list[i];
            }
        }

        return {
            type: GrblLineParserResultProbe,
            payload: payload
        };
    }
}

export default GrblLineParserResultProbe;

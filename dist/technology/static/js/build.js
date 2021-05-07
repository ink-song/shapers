THREE.ColladaLoader = function (e) {
  this.manager = void 0 !== e ? e : THREE.DefaultLoadingManager
}, THREE.ColladaLoader.prototype = {
  constructor: THREE.ColladaLoader,
  crossOrigin: "Anonymous",
  load: function (e, t, a, n) {
    var o = this,
      i = void 0 === o.path ? THREE.LoaderUtils.extractUrlBase(e) : o.path;
    new THREE.FileLoader(o.manager).load(e, function (e) {
      t(o.parse(e, i))
    }, a, n)
  },
  setPath: function (e) {
    this.path = e
  },
  options: {
    set convertUpAxis(e) {
      console.warn("THREE.ColladaLoader: options.convertUpAxis() has been removed. Up axis is converted automatically.")
    }
  },
  setCrossOrigin: function (e) {
    this.crossOrigin = e
  },
  parse: function (e, t) {
    function s(e, t) {
      for (var a = [], n = e.childNodes, o = 0, i = n.length; o < i; o++) {
        var r = n[o];
        r.nodeName === t && a.push(r)
      }
      return a
    }

    function i(e) {
      if (0 === e.length) return [];
      for (var t = e.trim().split(/\s+/), a = new Array(t.length), n = 0, o = t.length; n < o; n++) a[n] = t[n];
      return a
    }

    function g(e) {
      if (0 === e.length) return [];
      for (var t = e.trim().split(/\s+/), a = new Array(t.length), n = 0, o = t.length; n < o; n++) a[n] = parseFloat(t[n]);
      return a
    }

    function l(e) {
      if (0 === e.length) return [];
      for (var t = e.trim().split(/\s+/), a = new Array(t.length), n = 0, o = t.length; n < o; n++) a[n] = parseInt(t[n]);
      return a
    }

    function d(e) {
      return e.substring(1)
    }

    function h(e) {
      return 0 === Object.keys(e).length
    }

    function a(e, t, a, n) {
      var o = s(e, t)[0];
      if (void 0 !== o)
        for (var i = s(o, a), r = 0; r < i.length; r++) n(i[r])
    }

    function n(e, t) {
      for (var a in e) {
        e[a].build = t(e[a])
      }
    }

    function P(e, t) {
      return void 0 !== e.build || (e.build = t(e)), e.build
    }

    function r(e) {
      for (var t = {
          inputs: {}
        }, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "input":
            var i = d(o.getAttribute("source")),
              r = o.getAttribute("semantic");
            t.inputs[r] = i
        }
      }
      return t
    }

    function u(e) {
      var t = {},
        a = e.getAttribute("target").split("/"),
        n = a.shift(),
        o = a.shift(),
        i = -1 !== o.indexOf("("),
        r = -1 !== o.indexOf(".");
      if (r) o = (a = o.split(".")).shift(), t.member = a.shift();
      else if (i) {
        var s = o.split("(");
        o = s.shift();
        for (var l = 0; l < s.length; l++) s[l] = parseInt(s[l].replace(/\)/, ""));
        t.indices = s
      }
      return t.id = n, t.sid = o, t.arraySyntax = i, t.memberSyntax = r, t.sampler = d(e.getAttribute("source")), t
    }

    function o(e) {
      var t = [],
        a = e.channels,
        n = e.samplers,
        o = e.sources;
      for (var i in a)
        if (a.hasOwnProperty(i)) {
          var r = a[i],
            s = n[r.sampler],
            l = s.inputs.INPUT,
            d = s.inputs.OUTPUT;
          A(f(r, o[l], o[d]), t)
        } return t
    }

    function c(e) {
      return P(Me.animations[e], o)
    }

    function f(e, t, a) {
      var n, o, i, r, s, l, d = Me.nodes[e.id],
        u = Te(d.id),
        c = d.transforms[e.sid],
        f = d.matrix.clone().transpose(),
        h = {};
      switch (c) {
        case "matrix":
          for (i = 0, r = t.array.length; i < r; i++)
            if (n = t.array[i], o = i * a.stride, void 0 === h[n] && (h[n] = {}), !0 === e.arraySyntax) {
              var p = a.array[o],
                m = e.indices[0] + 4 * e.indices[1];
              h[n][m] = p
            } else
              for (s = 0, l = a.stride; s < l; s++) h[n][s] = a.array[o + s];
          break;
        case "translate":
        case "rotate":
        case "scale":
          console.warn('THREE.ColladaLoader: Animation transform type "%s" not yet implemented.', c)
      }
      var _ = function (e, t) {
        var a = [];
        for (var n in e) a.push({
          time: parseFloat(n),
          value: e[n]
        });
        a.sort(function (e, t) {
          return e.time - t.time
        });
        for (var o = 0; o < 16; o++) v(a, o, t.elements[o]);
        return a
      }(h, f);
      return {
        name: u.uuid,
        keyframes: _
      }
    }
    var p = new THREE.Vector3,
      m = new THREE.Vector3,
      _ = new THREE.Quaternion;

    function A(e, t) {
      for (var a = e.keyframes, n = e.name, o = [], i = [], r = [], s = [], l = 0, d = a.length; l < d; l++) {
        var u = a[l],
          c = u.time,
          f = u.value;
        pe.fromArray(f).transpose(), pe.decompose(p, _, m), o.push(c), i.push(p.x, p.y, p.z), r.push(_.x, _.y, _.z, _.w), s.push(m.x, m.y, m.z)
      }
      return 0 < i.length && t.push(new THREE.VectorKeyframeTrack(n + ".position", o, i)), 0 < r.length && t.push(new THREE.QuaternionKeyframeTrack(n + ".quaternion", o, r)), 0 < s.length && t.push(new THREE.VectorKeyframeTrack(n + ".scale", o, s)), t
    }

    function v(e, t, a) {
      var n, o, i, r = !0;
      for (o = 0, i = e.length; o < i; o++) void 0 === (n = e[o]).value[t] ? n.value[t] = null : r = !1;
      if (!0 === r)
        for (o = 0, i = e.length; o < i; o++)(n = e[o]).value[t] = a;
      else ! function (e, t) {
        for (var a, n, o = 0, i = e.length; o < i; o++) {
          var r = e[o];
          if (null === r.value[t]) {
            if (a = x(e, o, t), n = b(e, o, t), null === a) {
              r.value[t] = n.value[t];
              continue
            }
            if (null === n) {
              r.value[t] = a.value[t];
              continue
            }
            E(r, a, n, t)
          }
        }
      }(e, t)
    }

    function x(e, t, a) {
      for (; 0 <= t;) {
        var n = e[t];
        if (null !== n.value[a]) return n;
        t--
      }
      return null
    }

    function b(e, t, a) {
      for (; t < e.length;) {
        var n = e[t];
        if (null !== n.value[a]) return n;
        t++
      }
      return null
    }

    function E(e, t, a, n) {
      a.time - t.time != 0 ? e.value[n] = (e.time - t.time) * (a.value[n] - t.value[n]) / (a.time - t.time) + t.value[n] : e.value[n] = t.value[n]
    }

    function T(e) {
      for (var t = [], a = e.name, n = e.end - e.start || -1, o = e.animations, i = 0, r = o.length; i < r; i++)
        for (var s = c(o[i]), l = 0, d = s.length; l < d; l++) t.push(s[l]);
      return new THREE.AnimationClip(a, n, t)
    }

    function y(e) {
      for (var t = {
          sources: {}
        }, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "bind_shape_matrix":
            t.bindShapeMatrix = g(o.textContent);
            break;
          case "source":
            var i = o.getAttribute("id");
            t.sources[i] = J(o);
            break;
          case "joints":
            t.joints = F(o);
            break;
          case "vertex_weights":
            t.vertexWeights = w(o)
        }
      }
      return t
    }

    function F(e) {
      for (var t = {
          inputs: {}
        }, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "input":
            var i = o.getAttribute("semantic"),
              r = d(o.getAttribute("source"));
            t.inputs[i] = r
        }
      }
      return t
    }

    function w(e) {
      for (var t = {
          inputs: {}
        }, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "input":
            var i = o.getAttribute("semantic"),
              r = d(o.getAttribute("source")),
              s = parseInt(o.getAttribute("offset"));
            t.inputs[i] = {
              id: r,
              offset: s
            };
            break;
          case "vcount":
            t.vcount = l(o.textContent);
            break;
          case "v":
            t.v = l(o.textContent)
        }
      }
      return t
    }

    function N(e) {
      var t = {
          id: e.id
        },
        a = Me.geometries[t.id];
      return void 0 !== e.skin && (t.skin = function (e) {
        var t, a, n, o = {
            joints: [],
            indices: {
              array: [],
              stride: 4
            },
            weights: {
              array: [],
              stride: 4
            }
          },
          i = e.sources,
          r = e.vertexWeights,
          s = r.vcount,
          l = r.v,
          d = r.inputs.JOINT.offset,
          u = r.inputs.WEIGHT.offset,
          c = e.sources[e.joints.inputs.JOINT],
          f = e.sources[e.joints.inputs.INV_BIND_MATRIX],
          h = i[r.inputs.WEIGHT.id].array,
          p = 0;
        for (t = 0, n = s.length; t < n; t++) {
          var m = s[t],
            _ = [];
          for (a = 0; a < m; a++) {
            var g = l[p + d],
              A = l[p + u],
              v = h[A];
            _.push({
              index: g,
              weight: v
            }), p += 2
          }
          for (_.sort(T), a = 0; a < 4; a++) {
            var x = _[a];
            void 0 !== x ? (o.indices.array.push(x.index), o.weights.array.push(x.weight)) : (o.indices.array.push(0), o.weights.array.push(0))
          }
        }
        for (o.bindMatrix = (new THREE.Matrix4).fromArray(e.bindShapeMatrix).transpose(), t = 0, n = c.array.length; t < n; t++) {
          var b = c.array[t],
            E = (new THREE.Matrix4).fromArray(f.array, t * f.stride).transpose();
          o.joints.push({
            name: b,
            boneInverse: E
          })
        }
        return o;

        function T(e, t) {
          return t.weight - e.weight
        }
      }(e.skin), a.sources.skinIndices = t.skin.indices, a.sources.skinWeights = t.skin.weights), t
    }

    function S(e) {
      return void 0 !== e.build ? e.build : e.init_from
    }

    function R(e) {
      return P(Me.images[e], S)
    }

    function L(e) {
      for (var t = {
          surfaces: {},
          samplers: {}
        }, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "newparam":
            C(o, t);
            break;
          case "technique":
            t.technique = U(o);
            break;
          case "extra":
            t.extra = Y(o)
        }
      }
      return t
    }

    function C(e, t) {
      for (var a = e.getAttribute("sid"), n = 0, o = e.childNodes.length; n < o; n++) {
        var i = e.childNodes[n];
        if (1 === i.nodeType) switch (i.nodeName) {
          case "surface":
            t.surfaces[a] = I(i);
            break;
          case "sampler2D":
            t.samplers[a] = H(i)
        }
      }
    }

    function I(e) {
      for (var t = {}, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "init_from":
            t.init_from = o.textContent
        }
      }
      return t
    }

    function H(e) {
      for (var t = {}, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "source":
            t.source = o.textContent
        }
      }
      return t
    }

    function U(e) {
      for (var t = {}, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "constant":
          case "lambert":
          case "blinn":
          case "phong":
            t.type = o.nodeName, t.parameters = O(o)
        }
      }
      return t
    }

    function O(e) {
      for (var t = {}, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "emission":
          case "diffuse":
          case "specular":
          case "shininess":
          case "transparency":
            t[o.nodeName] = M(o);
            break;
          case "transparent":
            t[o.nodeName] = {
              opaque: o.getAttribute("opaque"),
              data: M(o)
            }
        }
      }
      return t
    }

    function M(e) {
      for (var t = {}, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "color":
            t[o.nodeName] = g(o.textContent);
            break;
          case "float":
            t[o.nodeName] = parseFloat(o.textContent);
            break;
          case "texture":
            t[o.nodeName] = {
              id: o.getAttribute("texture"),
              extra: X(o)
            }
        }
      }
      return t
    }

    function X(e) {
      for (var t = {
          technique: {}
        }, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "extra":
            k(o, t)
        }
      }
      return t
    }

    function k(e, t) {
      for (var a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "technique":
            D(o, t)
        }
      }
    }

    function D(e, t) {
      for (var a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "repeatU":
          case "repeatV":
          case "offsetU":
          case "offsetV":
            t.technique[o.nodeName] = parseFloat(o.textContent);
            break;
          case "wrapU":
          case "wrapV":
            "TRUE" === o.textContent.toUpperCase() ? t.technique[o.nodeName] = 1 : "FALSE" === o.textContent.toUpperCase() ? t.technique[o.nodeName] = 0 : t.technique[o.nodeName] = parseInt(o.textContent)
        }
      }
    }

    function Y(e) {
      for (var t = {}, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "technique":
            t.technique = Q(o)
        }
      }
      return t
    }

    function Q(e) {
      for (var t = {}, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "double_sided":
            t[o.nodeName] = parseInt(o.textContent)
        }
      }
      return t
    }

    function B(e) {
      return e
    }

    function j(e) {
      var t, a, r = (t = e.url, P(Me.effects[t], B)),
        n = r.profile.technique,
        o = r.profile.extra;
      switch (n.type) {
        case "phong":
        case "blinn":
          a = new THREE.MeshPhongMaterial;
          break;
        case "lambert":
          a = new THREE.MeshLambertMaterial;
          break;
        default:
          a = new THREE.MeshBasicMaterial
      }

      function i(e) {
        var t, a = r.profile.samplers[e.id];
        void 0 !== a ? t = R(r.profile.surfaces[a.source].init_from) : (console.warn("THREE.ColladaLoader: Undefined sampler. Access image directly (see #12530)."), t = R(e.id));
        if (void 0 === t) return console.error("THREE.ColladaLoader: Unable to load texture with ID:", e.id), null;
        var n = Ie.load(t),
          o = e.extra;
        if (void 0 !== o && void 0 !== o.technique && !1 === h(o.technique)) {
          var i = o.technique;
          n.wrapS = i.wrapU ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping, n.wrapT = i.wrapV ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping, n.offset.set(i.offsetU || 0, i.offsetV || 0), n.repeat.set(i.repeatU || 1, i.repeatV || 1)
        } else n.wrapS = THREE.RepeatWrapping, n.wrapT = THREE.RepeatWrapping;
        return n
      }
      a.name = e.name;
      var s = n.parameters;
      for (var l in s) {
        var d = s[l];
        switch (l) {
          case "diffuse":
            d.color && a.color.fromArray(d.color), d.texture && (a.map = i(d.texture));
            break;
          case "specular":
            d.color && a.specular && a.specular.fromArray(d.color), d.texture && (a.specularMap = i(d.texture));
            break;
          case "shininess":
            d.float && a.shininess && (a.shininess = d.float);
            break;
          case "emission":
            d.color && a.emissive && a.emissive.fromArray(d.color)
        }
      }
      var u = s.transparent,
        c = s.transparency;
      if (void 0 === c && u && (c = {
          float: 1
        }), void 0 === u && c && (u = {
          opaque: "A_ONE",
          data: {
            color: [1, 1, 1, 1]
          }
        }), u && c)
        if (u.data.texture) a.alphaMap = i(u.data.texture), a.transparent = !0;
        else {
          var f = u.data.color;
          switch (u.opaque) {
            case "A_ONE":
              a.opacity = f[3] * c.float;
              break;
            case "RGB_ZERO":
              a.opacity = 1 - f[0] * c.float;
              break;
            case "A_ZERO":
              a.opacity = 1 - f[3] * c.float;
              break;
            case "RGB_ONE":
              a.opacity = f[0] * c.float;
              break;
            default:
              console.warn('THREE.ColladaLoader: Invalid opaque type "%s" of transparent tag.', u.opaque)
          }
          a.opacity < 1 && (a.transparent = !0)
        } return void 0 !== o && void 0 !== o.technique && 1 === o.technique.double_sided && (a.side = THREE.DoubleSide), a
    }

    function G(e) {
      for (var t = 0; t < e.childNodes.length; t++) {
        var a = e.childNodes[t];
        switch (a.nodeName) {
          case "technique_common":
            return z(a)
        }
      }
      return {}
    }

    function z(e) {
      for (var t = {}, a = 0; a < e.childNodes.length; a++) {
        var n = e.childNodes[a];
        switch (n.nodeName) {
          case "perspective":
          case "orthographic":
            t.technique = n.nodeName, t.parameters = V(n)
        }
      }
      return t
    }

    function V(e) {
      for (var t = {}, a = 0; a < e.childNodes.length; a++) {
        var n = e.childNodes[a];
        switch (n.nodeName) {
          case "xfov":
          case "yfov":
          case "xmag":
          case "ymag":
          case "znear":
          case "zfar":
          case "aspect_ratio":
            t[n.nodeName] = parseFloat(n.textContent)
        }
      }
      return t
    }

    function W(e) {
      var t;
      switch (e.optics.technique) {
        case "perspective":
          t = new THREE.PerspectiveCamera(e.optics.parameters.yfov, e.optics.parameters.aspect_ratio, e.optics.parameters.znear, e.optics.parameters.zfar);
          break;
        case "orthographic":
          var a = e.optics.parameters.ymag,
            n = e.optics.parameters.xmag,
            o = e.optics.parameters.aspect_ratio;
          n = void 0 === n ? a * o : n, a = void 0 === a ? n / o : a, n *= .5, a *= .5, t = new THREE.OrthographicCamera(-n, n, a, -a, e.optics.parameters.znear, e.optics.parameters.zfar);
          break;
        default:
          t = new THREE.PerspectiveCamera
      }
      return t.name = e.name, t
    }

    function q(e) {
      for (var t = {}, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "directional":
          case "point":
          case "spot":
          case "ambient":
            t.technique = o.nodeName, t.parameters = K(o)
        }
      }
      return t
    }

    function K(e) {
      for (var t = {}, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "color":
            var i = g(o.textContent);
            t.color = (new THREE.Color).fromArray(i);
            break;
          case "falloff_angle":
            t.falloffAngle = parseFloat(o.textContent);
            break;
          case "quadratic_attenuation":
            var r = parseFloat(o.textContent);
            t.distance = r ? Math.sqrt(1 / r) : 0
        }
      }
      return t
    }

    function Z(e) {
      var t;
      switch (e.technique) {
        case "directional":
          t = new THREE.DirectionalLight;
          break;
        case "point":
          t = new THREE.PointLight;
          break;
        case "spot":
          t = new THREE.SpotLight;
          break;
        case "ambient":
          t = new THREE.AmbientLight
      }
      return e.parameters.color && t.color.copy(e.parameters.color), e.parameters.distance && (t.distance = e.parameters.distance), t
    }

    function J(e) {
      for (var t = {
          array: [],
          stride: 3
        }, a = 0; a < e.childNodes.length; a++) {
        var n = e.childNodes[a];
        if (1 === n.nodeType) switch (n.nodeName) {
          case "float_array":
            t.array = g(n.textContent);
            break;
          case "Name_array":
            t.array = i(n.textContent);
            break;
          case "technique_common":
            var o = s(n, "accessor")[0];
            void 0 !== o && (t.stride = parseInt(o.getAttribute("stride")))
        }
      }
      return t
    }

    function $(e) {
      for (var t = {}, a = 0; a < e.childNodes.length; a++) {
        var n = e.childNodes[a];
        1 === n.nodeType && (t[n.getAttribute("semantic")] = d(n.getAttribute("source")))
      }
      return t
    }

    function ee(e) {
      for (var t = {
          type: e.nodeName,
          material: e.getAttribute("material"),
          count: parseInt(e.getAttribute("count")),
          inputs: {},
          stride: 0
        }, a = 0, n = e.childNodes.length; a < n; a++) {
        var o = e.childNodes[a];
        if (1 === o.nodeType) switch (o.nodeName) {
          case "input":
            var i = d(o.getAttribute("source")),
              r = o.getAttribute("semantic"),
              s = parseInt(o.getAttribute("offset"));
            t.inputs[r] = {
              id: i,
              offset: s
            }, t.stride = Math.max(t.stride, s + 1);
            break;
          case "vcount":
            t.vcount = l(o.textContent);
            break;
          case "p":
            t.p = l(o.textContent)
        }
      }
      return t
    }

    function te(e) {
      var t = {},
        a = e.sources,
        n = e.vertices,
        o = e.primitives;
      if (0 === o.length) return {};
      var i = function (e) {
        for (var t = {}, a = 0; a < e.length; a++) {
          var n = e[a];
          void 0 === t[n.type] && (t[n.type] = []), t[n.type].push(n)
        }
        return t
      }(o);
      for (var r in i) t[r] = ae(i[r], a, n);
      return t
    }

    function ae(e, t, a) {
      for (var n = {}, o = {
          array: [],
          stride: 0
        }, i = {
          array: [],
          stride: 0
        }, r = {
          array: [],
          stride: 0
        }, s = {
          array: [],
          stride: 0
        }, l = [], d = 4, u = [], c = 4, f = new THREE.BufferGeometry, h = [], p = 0, m = 0, _ = 0; _ < e.length; _++) {
        var g = e[_],
          A = g.inputs,
          v = 1;
        for (var x in g.vcount && 4 === g.vcount[0] && (v = 2), m = "lines" === g.type || "linestrips" === g.type ? 2 * g.count : 3 * g.count * v, f.addGroup(p, m, _), p += m, g.material && h.push(g.material), A) {
          var b = A[x];
          switch (x) {
            case "VERTEX":
              for (var E in a) {
                var T = a[E];
                switch (E) {
                  case "POSITION":
                    ne(g, t[T], b.offset, o.array), o.stride = t[T].stride, t.skinWeights && t.skinIndices && (ne(g, t.skinIndices, b.offset, l), ne(g, t.skinWeights, b.offset, u));
                    break;
                  case "NORMAL":
                    ne(g, t[T], b.offset, i.array), i.stride = t[T].stride;
                    break;
                  case "COLOR":
                    ne(g, t[T], b.offset, s.array), s.stride = t[T].stride;
                    break;
                  case "TEXCOORD":
                    ne(g, t[T], b.offset, r.array), r.stride = t[T].stride;
                    break;
                  default:
                    console.warn('THREE.ColladaLoader: Semantic "%s" not handled in geometry build process.', E)
                }
              }
              break;
            case "NORMAL":
              ne(g, t[b.id], b.offset, i.array), i.stride = t[b.id].stride;
              break;
            case "COLOR":
              ne(g, t[b.id], b.offset, s.array), s.stride = t[b.id].stride;
              break;
            case "TEXCOORD":
              ne(g, t[b.id], b.offset, r.array), r.stride = t[b.id].stride
          }
        }
      }
      return 0 < o.array.length && f.addAttribute("position", new THREE.Float32BufferAttribute(o.array, o.stride)), 0 < i.array.length && f.addAttribute("normal", new THREE.Float32BufferAttribute(i.array, i.stride)), 0 < s.array.length && f.addAttribute("color", new THREE.Float32BufferAttribute(s.array, s.stride)), 0 < r.array.length && f.addAttribute("uv", new THREE.Float32BufferAttribute(r.array, r.stride)), 0 < l.length && f.addAttribute("skinIndex", new THREE.Float32BufferAttribute(l, d)), 0 < u.length && f.addAttribute("skinWeight", new THREE.Float32BufferAttribute(u, c)), n.data = f, n.type = e[0].type, n.materialKeys = h, n
    }

    function ne(e, t, n, o) {
      var i = e.p,
        a = e.stride,
        r = e.vcount;

      function s(e) {
        for (var t = i[e + n] * u, a = t + u; t < a; t++) o.push(d[t])
      }
      var l = 0,
        d = t.array,
        u = t.stride;
      if (void 0 !== e.vcount) {
        for (var c = 0, f = 0, h = r.length; f < h; f++) {
          var p = r[f];
          if (4 === p) {
            var m = c + +a,
              _ = c + 2 * a,
              g = c + 3 * a;
            s(c + 0 * a), s(m), s(g), s(m), s(_), s(g)
          } else if (3 === p) {
            m = c + +a, _ = c + 2 * a;
            s(c + 0 * a), s(m), s(_)
          } else l = Math.max(l, p);
          c += a * p
        }
        0 < l && console.log("THREE.ColladaLoader: Geometry has faces with more than 4 vertices.")
      } else
        for (f = 0, h = i.length; f < h; f += a) s(f)
    }

    function oe(e) {
      return P(Me.geometries[e], te)
    }

    function ie(e) {
      return void 0 !== e.build ? e.build : e
    }

    function re(e, t) {
      for (var a = 0; a < e.childNodes.length; a++) {
        var n = e.childNodes[a];
        if (1 === n.nodeType) switch (n.nodeName) {
          case "joint":
            t.joints[n.getAttribute("sid")] = se(n);
            break;
          case "link":
            t.links.push(de(n))
        }
      }
    }

    function se(e) {
      for (var t, a = 0; a < e.childNodes.length; a++) {
        var n = e.childNodes[a];
        if (1 === n.nodeType) switch (n.nodeName) {
          case "prismatic":
          case "revolute":
            t = le(n)
        }
      }
      return t
    }

    function le(e, t) {
      t = {
        sid: e.getAttribute("sid"),
        name: e.getAttribute("name") || "",
        axis: new THREE.Vector3,
        limits: {
          min: 0,
          max: 0
        },
        type: e.nodeName,
        static: !1,
        zeroPosition: 0,
        middlePosition: 0
      };
      for (var a = 0; a < e.childNodes.length; a++) {
        var n = e.childNodes[a];
        if (1 === n.nodeType) switch (n.nodeName) {
          case "axis":
            var o = g(n.textContent);
            t.axis.fromArray(o);
            break;
          case "limits":
            var i = n.getElementsByTagName("max")[0],
              r = n.getElementsByTagName("min")[0];
            t.limits.max = parseFloat(i.textContent), t.limits.min = parseFloat(r.textContent)
        }
      }
      return t.limits.min >= t.limits.max && (t.static = !0), t.middlePosition = (t.limits.min + t.limits.max) / 2, t
    }

    function de(e) {
      for (var t = {
          sid: e.getAttribute("sid"),
          name: e.getAttribute("name") || "",
          attachments: [],
          transforms: []
        }, a = 0; a < e.childNodes.length; a++) {
        var n = e.childNodes[a];
        if (1 === n.nodeType) switch (n.nodeName) {
          case "attachment_full":
            t.attachments.push(ue(n));
            break;
          case "matrix":
          case "translate":
          case "rotate":
            t.transforms.push(ce(n))
        }
      }
      return t
    }

    function ue(e) {
      for (var t = {
          joint: e.getAttribute("joint").split("/").pop(),
          transforms: [],
          links: []
        }, a = 0; a < e.childNodes.length; a++) {
        var n = e.childNodes[a];
        if (1 === n.nodeType) switch (n.nodeName) {
          case "link":
            t.links.push(de(n));
            break;
          case "matrix":
          case "translate":
          case "rotate":
            t.transforms.push(ce(n))
        }
      }
      return t
    }

    function ce(e) {
      var t = {
          type: e.nodeName
        },
        a = g(e.textContent);
      switch (t.type) {
        case "matrix":
          t.obj = new THREE.Matrix4, t.obj.fromArray(a).transpose();
          break;
        case "translate":
          t.obj = new THREE.Vector3, t.obj.fromArray(a);
          break;
        case "rotate":
          t.obj = new THREE.Vector3, t.obj.fromArray(a), t.angle = THREE.Math.degToRad(a[3])
      }
      return t
    }

    function fe(e) {
      for (var t = {
          target: e.getAttribute("target").split("/").pop()
        }, a = 0; a < e.childNodes.length; a++) {
        var n = e.childNodes[a];
        if (1 === n.nodeType) switch (n.nodeName) {
          case "axis":
            var o = n.getElementsByTagName("param")[0];
            t.axis = o.textContent;
            var i = t.axis.split("inst_").pop().split("axis")[0];
            t.jointIndex = i.substr(0, i.length - 1)
        }
      }
      return t
    }

    function he(e) {
      return void 0 !== e.build ? e.build : e
    }
    var pe = new THREE.Matrix4,
      me = new THREE.Vector3;

    function _e(e) {
      for (var t = {
          name: e.getAttribute("name") || "",
          type: e.getAttribute("type"),
          id: e.getAttribute("id"),
          sid: e.getAttribute("sid"),
          matrix: new THREE.Matrix4,
          nodes: [],
          instanceCameras: [],
          instanceControllers: [],
          instanceLights: [],
          instanceGeometries: [],
          instanceNodes: [],
          transforms: {}
        }, a = 0; a < e.childNodes.length; a++) {
        var n = e.childNodes[a];
        if (1 === n.nodeType) switch (n.nodeName) {
          case "node":
            t.nodes.push(n.getAttribute("id")), _e(n);
            break;
          case "instance_camera":
            t.instanceCameras.push(d(n.getAttribute("url")));
            break;
          case "instance_controller":
            t.instanceControllers.push(ge(n));
            break;
          case "instance_light":
            t.instanceLights.push(d(n.getAttribute("url")));
            break;
          case "instance_geometry":
            t.instanceGeometries.push(ge(n));
            break;
          case "instance_node":
            t.instanceNodes.push(d(n.getAttribute("url")));
            break;
          case "matrix":
            var o = g(n.textContent);
            t.matrix.multiply(pe.fromArray(o).transpose()), t.transforms[n.getAttribute("sid")] = n.nodeName;
            break;
          case "translate":
            o = g(n.textContent);
            me.fromArray(o), t.matrix.multiply(pe.makeTranslation(me.x, me.y, me.z)), t.transforms[n.getAttribute("sid")] = n.nodeName;
            break;
          case "rotate":
            o = g(n.textContent);
            var i = THREE.Math.degToRad(o[3]);
            t.matrix.multiply(pe.makeRotationAxis(me.fromArray(o), i)), t.transforms[n.getAttribute("sid")] = n.nodeName;
            break;
          case "scale":
            o = g(n.textContent);
            t.matrix.scale(me.fromArray(o)), t.transforms[n.getAttribute("sid")] = n.nodeName;
            break;
          case "extra":
            break;
          default:
            console.log(n)
        }
      }
      return Me.nodes[t.id] = t
    }

    function ge(e) {
      for (var t = {
          id: d(e.getAttribute("url")),
          materials: {},
          skeletons: []
        }, a = 0; a < e.childNodes.length; a++) {
        var n = e.childNodes[a];
        switch (n.nodeName) {
          case "bind_material":
            for (var o = n.getElementsByTagName("instance_material"), i = 0; i < o.length; i++) {
              var r = o[i],
                s = r.getAttribute("symbol"),
                l = r.getAttribute("target");
              t.materials[s] = d(l)
            }
            break;
          case "skeleton":
            t.skeletons.push(d(n.textContent))
        }
      }
      return t
    }

    function Ae(e, t) {
      var a, n, o, i = [],
        r = [];
      for (a = 0; a < e.length; a++) {
        ve(Te(e[a]), t, i)
      }
      for (a = 0; a < t.length; a++)
        for (n = 0; n < i.length; n++)
          if ((o = i[n]).bone.name === t[a].name) {
            (r[a] = o).processed = !0;
            break
          } for (a = 0; a < i.length; a++) !1 === (o = i[a]).processed && (r.push(o), o.processed = !0);
      var s = [],
        l = [];
      for (a = 0; a < r.length; a++) o = r[a], s.push(o.bone), l.push(o.boneInverse);
      return new THREE.Skeleton(s, l)
    }

    function ve(e, o, i) {
      e.traverse(function (e) {
        if (!0 === e.isBone) {
          for (var t, a = 0; a < o.length; a++) {
            var n = o[a];
            if (n.name === e.name) {
              t = n.boneInverse;
              break
            }
          }
          void 0 === t && (t = new THREE.Matrix4), i.push({
            bone: e,
            boneInverse: t,
            processed: !1
          })
        }
      })
    }

    function xe(e) {
      for (var t, a, n, o, i, r = [], s = e.matrix, l = e.nodes, d = e.type, u = e.instanceCameras, c = e.instanceControllers, f = e.instanceLights, h = e.instanceGeometries, p = e.instanceNodes, m = 0, _ = l.length; m < _; m++) r.push(Te(l[m]));
      for (m = 0, _ = u.length; m < _; m++) {
        var g = (t = u[m], void 0 !== (a = Me.cameras[t]) ? P(a, W) : (console.warn("THREE.ColladaLoader: Couldn't find camera with ID:", t), null));
        null !== g && r.push(g.clone())
      }
      for (m = 0, _ = c.length; m < _; m++)
        for (var A = c[m], v = (n = A.id, P(Me.controllers[n], N)), x = Ee(oe(v.id), A.materials), b = Ae(A.skeletons, v.skin.joints), E = 0, T = x.length; E < T; E++) {
          var y;
          (y = x[E]).isSkinnedMesh && (y.bind(b, v.skin.bindMatrix), y.normalizeSkinWeights()), r.push(y)
        }
      for (m = 0, _ = f.length; m < _; m++) {
        var F = (o = f[m], void 0 !== (i = Me.lights[o]) ? P(i, Z) : (console.warn("THREE.ColladaLoader: Couldn't find light with ID:", o), null));
        null !== F && r.push(F.clone())
      }
      for (m = 0, _ = h.length; m < _; m++)
        for (E = 0, T = (x = Ee(oe((A = h[m]).id), A.materials)).length; E < T; E++) r.push(x[E]);
      for (m = 0, _ = p.length; m < _; m++) r.push(Te(p[m]).clone());
      if (0 === l.length && 1 === r.length) y = r[0];
      else {
        y = "JOINT" === d ? new THREE.Bone : new THREE.Group;
        for (m = 0; m < r.length; m++) y.add(r[m])
      }
      return "" === y.name && (y.name = "JOINT" === d ? e.sid : e.name), y.matrix.copy(s), y.matrix.decompose(y.position, y.quaternion, y.scale), y
    }

    function be(e, t) {
      for (var a, n = [], o = 0, i = e.length; o < i; o++) {
        var r = t[e[o]];
        n.push((a = r, P(Me.materials[a], j)))
      }
      return n
    }

    function Ee(e, t) {
      var a = [];
      for (var n in e) {
        var o = e[n],
          i = be(o.materialKeys, t);
        0 === i.length && ("lines" === n || "linestrips" === n ? i.push(new THREE.LineBasicMaterial) : i.push(new THREE.MeshPhongMaterial));
        var r = void 0 !== o.data.attributes.skinIndex;
        if (r)
          for (var s = 0, l = i.length; s < l; s++) i[s].skinning = !0;
        var d, u = 1 === i.length ? i[0] : i;
        switch (n) {
          case "lines":
            d = new THREE.LineSegments(o.data, u);
            break;
          case "linestrips":
            d = new THREE.Line(o.data, u);
            break;
          case "triangles":
          case "polylist":
            d = r ? new THREE.SkinnedMesh(o.data, u) : new THREE.Mesh(o.data, u)
        }
        a.push(d)
      }
      return a
    }

    function Te(e) {
      return P(Me.nodes[e], xe)
    }

    function ye(e) {
      var t = new THREE.Group;
      t.name = e.name;
      for (var a = e.children, n = 0; n < a.length; n++) {
        var o = a[n];
        t.add(Te(o.id))
      }
      return t
    }

    function Fe(e) {
      return P(Me.visualScenes[e], ye)
    }
    if (console.time("THREE.ColladaLoader"), 0 === e.length) return {
      scene: new THREE.Scene
    };
    console.time("THREE.ColladaLoader: DOMParser");
    var Pe = (new DOMParser).parseFromString(e, "application/xml");
    console.timeEnd("THREE.ColladaLoader: DOMParser");
    var we = s(Pe, "COLLADA")[0],
      Ne = we.getAttribute("version");
    console.log("THREE.ColladaLoader: File version", Ne);
    var Se, Re, Le, Ce = (Se = s(we, "asset")[0], {
        unit: void 0 !== (Le = s(Se, "unit")[0]) && !0 === Le.hasAttribute("meter") ? parseFloat(Le.getAttribute("meter")) : 1,
        upAxis: void 0 !== (Re = s(Se, "up_axis")[0]) ? Re.textContent : "Y_UP"
      }),
      Ie = new THREE.TextureLoader(this.manager);
    Ie.setPath(t).setCrossOrigin(this.crossOrigin);
    var He = [],
      Ue = {},
      Oe = 0,
      Me = {
        animations: {},
        clips: {},
        controllers: {},
        images: {},
        effects: {},
        materials: {},
        cameras: {},
        lights: {},
        geometries: {},
        nodes: {},
        visualScenes: {},
        kinematicsModels: {},
        kinematicsScenes: {}
      };
    console.time("THREE.ColladaLoader: Parse"), a(we, "library_animations", "animation", function (e) {
        for (var t = {
            sources: {},
            samplers: {},
            channels: {}
          }, a = 0, n = e.childNodes.length; a < n; a++) {
          var o, i = e.childNodes[a];
          if (1 === i.nodeType) switch (i.nodeName) {
            case "source":
              o = i.getAttribute("id"), t.sources[o] = J(i);
              break;
            case "sampler":
              o = i.getAttribute("id"), t.samplers[o] = r(i);
              break;
            case "channel":
              o = i.getAttribute("target"), t.channels[o] = u(i);
              break;
            default:
              console.log(i)
          }
        }
        Me.animations[e.getAttribute("id")] = t
      }), a(we, "library_animation_clips", "animation_clip", function (e) {
        for (var t = {
            name: e.getAttribute("id") || "default",
            start: parseFloat(e.getAttribute("start") || 0),
            end: parseFloat(e.getAttribute("end") || 0),
            animations: []
          }, a = 0, n = e.childNodes.length; a < n; a++) {
          var o = e.childNodes[a];
          if (1 === o.nodeType) switch (o.nodeName) {
            case "instance_animation":
              t.animations.push(d(o.getAttribute("url")))
          }
        }
        Me.clips[e.getAttribute("id")] = t
      }), a(we, "library_controllers", "controller", function (e) {
        for (var t = {}, a = 0, n = e.childNodes.length; a < n; a++) {
          var o = e.childNodes[a];
          if (1 === o.nodeType) switch (o.nodeName) {
            case "skin":
              t.id = d(o.getAttribute("source")), t.skin = y(o);
              break;
            case "morph":
              t.id = d(o.getAttribute("source")), console.warn("THREE.ColladaLoader: Morph target animation not supported yet.")
          }
        }
        Me.controllers[e.getAttribute("id")] = t
      }), a(we, "library_images", "image", function (e) {
        var t = {
          init_from: s(e, "init_from")[0].textContent
        };
        Me.images[e.getAttribute("id")] = t
      }), a(we, "library_effects", "effect", function (e) {
        for (var t = {}, a = 0, n = e.childNodes.length; a < n; a++) {
          var o = e.childNodes[a];
          if (1 === o.nodeType) switch (o.nodeName) {
            case "profile_COMMON":
              t.profile = L(o)
          }
        }
        Me.effects[e.getAttribute("id")] = t
      }), a(we, "library_materials", "material", function (e) {
        for (var t = {
            name: e.getAttribute("name")
          }, a = 0, n = e.childNodes.length; a < n; a++) {
          var o = e.childNodes[a];
          if (1 === o.nodeType) switch (o.nodeName) {
            case "instance_effect":
              t.url = d(o.getAttribute("url"))
          }
        }
        Me.materials[e.getAttribute("id")] = t
      }), a(we, "library_cameras", "camera", function (e) {
        for (var t = {
            name: e.getAttribute("name")
          }, a = 0, n = e.childNodes.length; a < n; a++) {
          var o = e.childNodes[a];
          if (1 === o.nodeType) switch (o.nodeName) {
            case "optics":
              t.optics = G(o)
          }
        }
        Me.cameras[e.getAttribute("id")] = t
      }), a(we, "library_lights", "light", function (e) {
        for (var t = {}, a = 0, n = e.childNodes.length; a < n; a++) {
          var o = e.childNodes[a];
          if (1 === o.nodeType) switch (o.nodeName) {
            case "technique_common":
              t = q(o)
          }
        }
        Me.lights[e.getAttribute("id")] = t
      }), a(we, "library_geometries", "geometry", function (e) {
        var t = {
            name: e.getAttribute("name"),
            sources: {},
            vertices: {},
            primitives: []
          },
          a = s(e, "mesh")[0];
        if (void 0 !== a) {
          for (var n = 0; n < a.childNodes.length; n++) {
            var o = a.childNodes[n];
            if (1 === o.nodeType) {
              var i = o.getAttribute("id");
              switch (o.nodeName) {
                case "source":
                  t.sources[i] = J(o);
                  break;
                case "vertices":
                  t.vertices = $(o);
                  break;
                case "polygons":
                  console.warn("THREE.ColladaLoader: Unsupported primitive type: ", o.nodeName);
                  break;
                case "lines":
                case "linestrips":
                case "polylist":
                case "triangles":
                  t.primitives.push(ee(o));
                  break;
                default:
                  console.log(o)
              }
            }
          }
          Me.geometries[e.getAttribute("id")] = t
        }
      }), a(we, "library_nodes", "node", _e), a(we, "library_visual_scenes", "visual_scene", function (e) {
        var t = {
          name: e.getAttribute("name"),
          children: []
        };
        ! function (e) {
          for (var t = e.getElementsByTagName("node"), a = 0; a < t.length; a++) {
            var n = t[a];
            !1 === n.hasAttribute("id") && n.setAttribute("id", "three_default_" + Oe++)
          }
        }(e);
        for (var a = s(e, "node"), n = 0; n < a.length; n++) t.children.push(_e(a[n]));
        Me.visualScenes[e.getAttribute("id")] = t
      }), a(we, "library_kinematics_models", "kinematics_model", function (e) {
        for (var t = {
            name: e.getAttribute("name") || "",
            joints: {},
            links: []
          }, a = 0; a < e.childNodes.length; a++) {
          var n = e.childNodes[a];
          if (1 === n.nodeType) switch (n.nodeName) {
            case "technique_common":
              re(n, t)
          }
        }
        Me.kinematicsModels[e.getAttribute("id")] = t
      }), a(we, "scene", "instance_kinematics_scene", function (e) {
        for (var t = {
            bindJointAxis: []
          }, a = 0; a < e.childNodes.length; a++) {
          var n = e.childNodes[a];
          if (1 === n.nodeType) switch (n.nodeName) {
            case "bind_joint_axis":
              t.bindJointAxis.push(fe(n))
          }
        }
        Me.kinematicsScenes[d(e.getAttribute("url"))] = t
      }), console.timeEnd("THREE.ColladaLoader: Parse"), console.time("THREE.ColladaLoader: Build"), n(Me.animations, o), n(Me.clips, T), n(Me.controllers, N), n(Me.images, S), n(Me.effects, B), n(Me.materials, j), n(Me.cameras, W), n(Me.lights, Z), n(Me.geometries, te), n(Me.visualScenes, ye), console.timeEnd("THREE.ColladaLoader: Build"),
      function () {
        var e, t = Me.clips;
        if (!0 === h(t)) {
          if (!1 === h(Me.animations)) {
            var a = [];
            for (var n in Me.animations)
              for (var o = c(n), i = 0, r = o.length; i < r; i++) a.push(o[i]);
            He.push(new THREE.AnimationClip("default", -1, a))
          }
        } else
          for (var n in t) He.push((e = n, P(Me.clips[e], T)))
      }(),
      function () {
        var e = Object.keys(Me.kinematicsModels)[0],
          t = Object.keys(Me.kinematicsScenes)[0],
          a = Object.keys(Me.visualScenes)[0];
        if (void 0 !== e && void 0 !== t) {
          for (var n, o, i = (n = e, P(Me.kinematicsModels[n], ie)), r = (o = t, P(Me.kinematicsScenes[o], he)), s = Fe(a), l = r.bindJointAxis, d = {}, u = 0, c = l.length; u < c; u++) {
            var f = l[u],
              h = we.querySelector('[sid="' + f.target + '"]');
            if (h) {
              var p = h.parentElement;
              _(f.jointIndex, p)
            }
          }
          var m = new THREE.Matrix4;
          Ue = {
            joints: i && i.joints,
            getJointValue: function (e) {
              var t = d[e];
              if (t) return t.position;
              console.warn("THREE.ColladaLoader: Joint " + e + " doesn't exist.")
            },
            setJointValue: function (e, t) {
              var a = d[e];
              if (a) {
                var n = a.joint;
                if (t > n.limits.max || t < n.limits.min) console.warn("THREE.ColladaLoader: Joint " + e + " value " + t + " outside of limits (min: " + n.limits.min + ", max: " + n.limits.max + ").");
                else if (n.static) console.warn("THREE.ColladaLoader: Joint " + e + " is static.");
                else {
                  var o = a.object,
                    i = n.axis,
                    r = a.transforms;
                  pe.identity();
                  for (var s = 0; s < r.length; s++) {
                    var l = r[s];
                    if (l.sid && -1 !== l.sid.indexOf(e)) switch (n.type) {
                      case "revolute":
                        pe.multiply(m.makeRotationAxis(i, THREE.Math.degToRad(t)));
                        break;
                      case "prismatic":
                        pe.multiply(m.makeTranslation(i.x * t, i.y * t, i.z * t));
                        break;
                      default:
                        console.warn("THREE.ColladaLoader: Unknown joint type: " + n.type)
                    } else switch (l.type) {
                      case "matrix":
                        pe.multiply(l.obj);
                        break;
                      case "translate":
                        pe.multiply(m.makeTranslation(l.obj.x, l.obj.y, l.obj.z));
                        break;
                      case "scale":
                        pe.scale(l.obj);
                        break;
                      case "rotate":
                        pe.multiply(m.makeRotationAxis(l.obj, l.angle))
                    }
                  }
                  o.matrix.copy(pe), o.matrix.decompose(o.position, o.quaternion, o.scale), d[e].position = t
                }
              } else console.log("THREE.ColladaLoader: " + e + " does not exist.")
            }
          }
        }

        function _(t, a) {
          var n = a.getAttribute("name"),
            o = i.joints[t];
          s.traverse(function (e) {
            e.name === n && (d[t] = {
              object: e,
              transforms: function (e) {
                for (var t = [], a = we.querySelector('[id="' + e.id + '"]'), n = 0; n < a.childNodes.length; n++) {
                  var o = a.childNodes[n];
                  if (1 === o.nodeType) switch (o.nodeName) {
                    case "matrix":
                      var i = g(o.textContent),
                        r = (new THREE.Matrix4).fromArray(i).transpose();
                      t.push({
                        sid: o.getAttribute("sid"),
                        type: o.nodeName,
                        obj: r
                      });
                      break;
                    case "translate":
                    case "scale":
                      i = g(o.textContent);
                      var s = (new THREE.Vector3).fromArray(i);
                      t.push({
                        sid: o.getAttribute("sid"),
                        type: o.nodeName,
                        obj: s
                      });
                      break;
                    case "rotate":
                      i = g(o.textContent), s = (new THREE.Vector3).fromArray(i);
                      var l = THREE.Math.degToRad(i[3]);
                      t.push({
                        sid: o.getAttribute("sid"),
                        type: o.nodeName,
                        obj: s,
                        angle: l
                      })
                  }
                }
                return t
              }(a),
              joint: o,
              position: o.zeroPosition
            })
          })
        }
      }();
    var Xe, ke = (Xe = s(we, "scene")[0], Fe(d(s(Xe, "instance_visual_scene")[0].getAttribute("url"))));
    return "Z_UP" === Ce.upAxis && (ke.rotation.x = -Math.PI / 2), ke.scale.multiplyScalar(Ce.unit), console.timeEnd("THREE.ColladaLoader"), {
      animations: He,
      kinematics: Ue,
      library: Me,
      scene: ke
    }
  }
}, THREE.ConvolutionShader = {
  defines: {
    KERNEL_SIZE_FLOAT: "25.0",
    KERNEL_SIZE_INT: "25"
  },
  uniforms: {
    tDiffuse: {
      value: null
    },
    uImageIncrement: {
      value: new THREE.Vector2(.001953125, 0)
    },
    cKernel: {
      value: []
    }
  },
  vertexShader: ["uniform vec2 uImageIncrement;", "varying vec2 vUv;", "void main() {", "vUv = uv - ( ( KERNEL_SIZE_FLOAT - 1.0 ) / 2.0 ) * uImageIncrement;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
  fragmentShader: ["uniform float cKernel[ KERNEL_SIZE_INT ];", "uniform sampler2D tDiffuse;", "uniform vec2 uImageIncrement;", "varying vec2 vUv;", "void main() {", "vec2 imageCoord = vUv;", "vec4 sum = vec4( 0.0, 0.0, 0.0, 0.0 );", "for( int i = 0; i < KERNEL_SIZE_INT; i ++ ) {", "sum += texture2D( tDiffuse, imageCoord ) * cKernel[ i ];", "imageCoord += uImageIncrement;", "}", "gl_FragColor = sum;", "}"].join("\n"),
  buildKernel: function (e) {
    var t, a, n, o, i, r, s = 2 * Math.ceil(3 * e) + 1;
    for (25 < s && (s = 25), o = .5 * (s - 1), a = new Array(s), t = n = 0; t < s; ++t) a[t] = (i = t - o, r = e, Math.exp(-i * i / (2 * r * r))), n += a[t];
    for (t = 0; t < s; ++t) a[t] /= n;
    return a
  }
}, THREE.CopyShader = {
  uniforms: {
    tDiffuse: {
      value: null
    },
    opacity: {
      value: 1
    }
  },
  vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
  fragmentShader: ["uniform float opacity;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "gl_FragColor = opacity * texel;", "}"].join("\n")
};
var Detector = {
  canvas: !!window.CanvasRenderingContext2D,
  webgl: function () {
    try {
      var e = document.createElement("canvas");
      return !(!window.WebGLRenderingContext || !e.getContext("webgl") && !e.getContext("experimental-webgl"))
    } catch (e) {
      return !1
    }
  }(),
  workers: !!window.Worker,
  fileapi: window.File && window.FileReader && window.FileList && window.Blob,
  getWebGLErrorMessage: function () {
    var e = document.createElement("div");
    return e.id = "webgl-error-message", e.style.fontFamily = "monospace", e.style.fontSize = "13px", e.style.fontWeight = "normal", e.style.textAlign = "center", e.style.background = "#fff", e.style.color = "#000", e.style.padding = "1.5em", e.style.width = "400px", e.style.margin = "5em auto 0", this.webgl || (e.innerHTML = window.WebGLRenderingContext ? ['Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br />', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join("\n") : ['Your browser does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" style="color:#000">WebGL</a>.<br/>', 'Find out how to get it <a href="http://get.webgl.org/" style="color:#000">here</a>.'].join("\n")), e
  },
  addGetWebGLMessage: function (e) {
    var t, a, n;
    t = void 0 !== (e = e || {}).parent ? e.parent : document.body, a = void 0 !== e.id ? e.id : "oldie", (n = Detector.getWebGLErrorMessage()).id = a, t.appendChild(n)
  }
};
"object" == typeof module && (module.exports = Detector), THREE.EffectComposer = function (e, t) {
    if (this.renderer = e, void 0 === t) {
      var a = {
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter,
          format: THREE.RGBAFormat,
          stencilBuffer: !1
        },
        n = e.getDrawingBufferSize();
      (t = new THREE.WebGLRenderTarget(n.width, n.height, a)).texture.name = "EffectComposer.rt1"
    }
    this.renderTarget1 = t, this.renderTarget2 = t.clone(), this.renderTarget2.texture.name = "EffectComposer.rt2", this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2, this.passes = [], void 0 === THREE.CopyShader && console.error("THREE.EffectComposer relies on THREE.CopyShader"), void 0 === THREE.ShaderPass && console.error("THREE.EffectComposer relies on THREE.ShaderPass"), this.copyPass = new THREE.ShaderPass(THREE.CopyShader)
  }, Object.assign(THREE.EffectComposer.prototype, {
    swapBuffers: function () {
      var e = this.readBuffer;
      this.readBuffer = this.writeBuffer, this.writeBuffer = e
    },
    addPass: function (e) {
      this.passes.push(e);
      var t = this.renderer.getDrawingBufferSize();
      e.setSize(t.width, t.height)
    },
    insertPass: function (e, t) {
      this.passes.splice(t, 0, e)
    },
    render: function (e) {
      var t, a, n = !1,
        o = this.passes.length;
      for (a = 0; a < o; a++)
        if (!1 !== (t = this.passes[a]).enabled) {
          if (t.render(this.renderer, this.writeBuffer, this.readBuffer, e, n), t.needsSwap) {
            if (n) {
              var i = this.renderer.context;
              i.stencilFunc(i.NOTEQUAL, 1, 4294967295), this.copyPass.render(this.renderer, this.writeBuffer, this.readBuffer, e), i.stencilFunc(i.EQUAL, 1, 4294967295)
            }
            this.swapBuffers()
          }
          void 0 !== THREE.MaskPass && (t instanceof THREE.MaskPass ? n = !0 : t instanceof THREE.ClearMaskPass && (n = !1))
        }
    },
    reset: function (e) {
      if (void 0 === e) {
        var t = this.renderer.getDrawingBufferSize();
        (e = this.renderTarget1.clone()).setSize(t.width, t.height)
      }
      this.renderTarget1.dispose(), this.renderTarget2.dispose(), this.renderTarget1 = e, this.renderTarget2 = e.clone(), this.writeBuffer = this.renderTarget1, this.readBuffer = this.renderTarget2
    },
    setSize: function (e, t) {
      this.renderTarget1.setSize(e, t), this.renderTarget2.setSize(e, t);
      for (var a = 0; a < this.passes.length; a++) this.passes[a].setSize(e, t)
    }
  }), THREE.Pass = function () {
    this.enabled = !0, this.needsSwap = !0, this.clear = !1, this.renderToScreen = !1
  }, Object.assign(THREE.Pass.prototype, {
    setSize: function (e, t) {},
    render: function (e, t, a, n, o) {
      console.error("THREE.Pass: .render() must be implemented in derived pass.")
    }
  }), THREE.FXAAShader = {
    uniforms: {
      tDiffuse: {
        value: null
      },
      resolution: {
        value: new THREE.Vector2(1 / 1024, 1 / 512)
      }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["precision highp float;", "", "uniform sampler2D tDiffuse;", "", "uniform vec2 resolution;", "", "varying vec2 vUv;", "", "// FXAA 3.11 implementation by NVIDIA, ported to WebGL by Agost Biro (biro@archilogic.com)", "", "//----------------------------------------------------------------------------------", "// File:        es3-keplerFXAAassetsshaders/FXAA_DefaultES.frag", "// SDK Version: v3.00", "// Email:       gameworks@nvidia.com", "// Site:        http://developer.nvidia.com/", "//", "// Copyright (c) 2014-2015, NVIDIA CORPORATION. All rights reserved.", "//", "// Redistribution and use in source and binary forms, with or without", "// modification, are permitted provided that the following conditions", "// are met:", "//  * Redistributions of source code must retain the above copyright", "//    notice, this list of conditions and the following disclaimer.", "//  * Redistributions in binary form must reproduce the above copyright", "//    notice, this list of conditions and the following disclaimer in the", "//    documentation and/or other materials provided with the distribution.", "//  * Neither the name of NVIDIA CORPORATION nor the names of its", "//    contributors may be used to endorse or promote products derived", "//    from this software without specific prior written permission.", "//", "// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ``AS IS'' AND ANY", "// EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE", "// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR", "// PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR", "// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,", "// EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,", "// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR", "// PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY", "// OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT", "// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE", "// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.", "//", "//----------------------------------------------------------------------------------", "", "#define FXAA_PC 1", "#define FXAA_GLSL_100 1", "#define FXAA_QUALITY_PRESET 12", "", "#define FXAA_GREEN_AS_LUMA 1", "", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_PC_CONSOLE", "    //", "    // The console algorithm for PC is included", "    // for developers targeting really low spec machines.", "    // Likely better to just run FXAA_PC, and use a really low preset.", "    //", "    #define FXAA_PC_CONSOLE 0", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_GLSL_120", "    #define FXAA_GLSL_120 0", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_GLSL_130", "    #define FXAA_GLSL_130 0", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_HLSL_3", "    #define FXAA_HLSL_3 0", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_HLSL_4", "    #define FXAA_HLSL_4 0", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_HLSL_5", "    #define FXAA_HLSL_5 0", "#endif", "/*==========================================================================*/", "#ifndef FXAA_GREEN_AS_LUMA", "    //", "    // For those using non-linear color,", "    // and either not able to get luma in alpha, or not wanting to,", "    // this enables FXAA to run using green as a proxy for luma.", "    // So with this enabled, no need to pack luma in alpha.", "    //", "    // This will turn off AA on anything which lacks some amount of green.", "    // Pure red and blue or combination of only R and B, will get no AA.", "    //", "    // Might want to lower the settings for both,", "    //    fxaaConsoleEdgeThresholdMin", "    //    fxaaQualityEdgeThresholdMin", "    // In order to insure AA does not get turned off on colors", "    // which contain a minor amount of green.", "    //", "    // 1 = On.", "    // 0 = Off.", "    //", "    #define FXAA_GREEN_AS_LUMA 0", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_EARLY_EXIT", "    //", "    // Controls algorithm's early exit path.", "    // On PS3 turning this ON adds 2 cycles to the shader.", "    // On 360 turning this OFF adds 10ths of a millisecond to the shader.", "    // Turning this off on console will result in a more blurry image.", "    // So this defaults to on.", "    //", "    // 1 = On.", "    // 0 = Off.", "    //", "    #define FXAA_EARLY_EXIT 1", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_DISCARD", "    //", "    // Only valid for PC OpenGL currently.", "    // Probably will not work when FXAA_GREEN_AS_LUMA = 1.", "    //", "    // 1 = Use discard on pixels which don't need AA.", "    //     For APIs which enable concurrent TEX+ROP from same surface.", "    // 0 = Return unchanged color on pixels which don't need AA.", "    //", "    #define FXAA_DISCARD 0", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_FAST_PIXEL_OFFSET", "    //", "    // Used for GLSL 120 only.", "    //", "    // 1 = GL API supports fast pixel offsets", "    // 0 = do not use fast pixel offsets", "    //", "    #ifdef GL_EXT_gpu_shader4", "        #define FXAA_FAST_PIXEL_OFFSET 1", "    #endif", "    #ifdef GL_NV_gpu_shader5", "        #define FXAA_FAST_PIXEL_OFFSET 1", "    #endif", "    #ifdef GL_ARB_gpu_shader5", "        #define FXAA_FAST_PIXEL_OFFSET 1", "    #endif", "    #ifndef FXAA_FAST_PIXEL_OFFSET", "        #define FXAA_FAST_PIXEL_OFFSET 0", "    #endif", "#endif", "/*--------------------------------------------------------------------------*/", "#ifndef FXAA_GATHER4_ALPHA", "    //", "    // 1 = API supports gather4 on alpha channel.", "    // 0 = API does not support gather4 on alpha channel.", "    //", "    #if (FXAA_HLSL_5 == 1)", "        #define FXAA_GATHER4_ALPHA 1", "    #endif", "    #ifdef GL_ARB_gpu_shader5", "        #define FXAA_GATHER4_ALPHA 1", "    #endif", "    #ifdef GL_NV_gpu_shader5", "        #define FXAA_GATHER4_ALPHA 1", "    #endif", "    #ifndef FXAA_GATHER4_ALPHA", "        #define FXAA_GATHER4_ALPHA 0", "    #endif", "#endif", "", "", "/*============================================================================", "                        FXAA QUALITY - TUNING KNOBS", "------------------------------------------------------------------------------", "NOTE the other tuning knobs are now in the shader function inputs!", "============================================================================*/", "#ifndef FXAA_QUALITY_PRESET", "    //", "    // Choose the quality preset.", "    // This needs to be compiled into the shader as it effects code.", "    // Best option to include multiple presets is to", "    // in each shader define the preset, then include this file.", "    //", "    // OPTIONS", "    // -----------------------------------------------------------------------", "    // 10 to 15 - default medium dither (10=fastest, 15=highest quality)", "    // 20 to 29 - less dither, more expensive (20=fastest, 29=highest quality)", "    // 39       - no dither, very expensive", "    //", "    // NOTES", "    // -----------------------------------------------------------------------", "    // 12 = slightly faster then FXAA 3.9 and higher edge quality (default)", "    // 13 = about same speed as FXAA 3.9 and better than 12", "    // 23 = closest to FXAA 3.9 visually and performance wise", "    //  _ = the lowest digit is directly related to performance", "    // _  = the highest digit is directly related to style", "    //", "    #define FXAA_QUALITY_PRESET 12", "#endif", "", "", "/*============================================================================", "", "                           FXAA QUALITY - PRESETS", "", "============================================================================*/", "", "/*============================================================================", "                     FXAA QUALITY - MEDIUM DITHER PRESETS", "============================================================================*/", "#if (FXAA_QUALITY_PRESET == 10)", "    #define FXAA_QUALITY_PS 3", "    #define FXAA_QUALITY_P0 1.5", "    #define FXAA_QUALITY_P1 3.0", "    #define FXAA_QUALITY_P2 12.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 11)", "    #define FXAA_QUALITY_PS 4", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 3.0", "    #define FXAA_QUALITY_P3 12.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 12)", "    #define FXAA_QUALITY_PS 5", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 4.0", "    #define FXAA_QUALITY_P4 12.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 13)", "    #define FXAA_QUALITY_PS 6", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 4.0", "    #define FXAA_QUALITY_P5 12.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 14)", "    #define FXAA_QUALITY_PS 7", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 4.0", "    #define FXAA_QUALITY_P6 12.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 15)", "    #define FXAA_QUALITY_PS 8", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 2.0", "    #define FXAA_QUALITY_P6 4.0", "    #define FXAA_QUALITY_P7 12.0", "#endif", "", "/*============================================================================", "                     FXAA QUALITY - LOW DITHER PRESETS", "============================================================================*/", "#if (FXAA_QUALITY_PRESET == 20)", "    #define FXAA_QUALITY_PS 3", "    #define FXAA_QUALITY_P0 1.5", "    #define FXAA_QUALITY_P1 2.0", "    #define FXAA_QUALITY_P2 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 21)", "    #define FXAA_QUALITY_PS 4", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 22)", "    #define FXAA_QUALITY_PS 5", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 23)", "    #define FXAA_QUALITY_PS 6", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 24)", "    #define FXAA_QUALITY_PS 7", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 3.0", "    #define FXAA_QUALITY_P6 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 25)", "    #define FXAA_QUALITY_PS 8", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 2.0", "    #define FXAA_QUALITY_P6 4.0", "    #define FXAA_QUALITY_P7 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 26)", "    #define FXAA_QUALITY_PS 9", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 2.0", "    #define FXAA_QUALITY_P6 2.0", "    #define FXAA_QUALITY_P7 4.0", "    #define FXAA_QUALITY_P8 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 27)", "    #define FXAA_QUALITY_PS 10", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 2.0", "    #define FXAA_QUALITY_P6 2.0", "    #define FXAA_QUALITY_P7 2.0", "    #define FXAA_QUALITY_P8 4.0", "    #define FXAA_QUALITY_P9 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 28)", "    #define FXAA_QUALITY_PS 11", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 2.0", "    #define FXAA_QUALITY_P6 2.0", "    #define FXAA_QUALITY_P7 2.0", "    #define FXAA_QUALITY_P8 2.0", "    #define FXAA_QUALITY_P9 4.0", "    #define FXAA_QUALITY_P10 8.0", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_QUALITY_PRESET == 29)", "    #define FXAA_QUALITY_PS 12", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.5", "    #define FXAA_QUALITY_P2 2.0", "    #define FXAA_QUALITY_P3 2.0", "    #define FXAA_QUALITY_P4 2.0", "    #define FXAA_QUALITY_P5 2.0", "    #define FXAA_QUALITY_P6 2.0", "    #define FXAA_QUALITY_P7 2.0", "    #define FXAA_QUALITY_P8 2.0", "    #define FXAA_QUALITY_P9 2.0", "    #define FXAA_QUALITY_P10 4.0", "    #define FXAA_QUALITY_P11 8.0", "#endif", "", "/*============================================================================", "                     FXAA QUALITY - EXTREME QUALITY", "============================================================================*/", "#if (FXAA_QUALITY_PRESET == 39)", "    #define FXAA_QUALITY_PS 12", "    #define FXAA_QUALITY_P0 1.0", "    #define FXAA_QUALITY_P1 1.0", "    #define FXAA_QUALITY_P2 1.0", "    #define FXAA_QUALITY_P3 1.0", "    #define FXAA_QUALITY_P4 1.0", "    #define FXAA_QUALITY_P5 1.5", "    #define FXAA_QUALITY_P6 2.0", "    #define FXAA_QUALITY_P7 2.0", "    #define FXAA_QUALITY_P8 2.0", "    #define FXAA_QUALITY_P9 2.0", "    #define FXAA_QUALITY_P10 4.0", "    #define FXAA_QUALITY_P11 8.0", "#endif", "", "", "", "/*============================================================================", "", "                                API PORTING", "", "============================================================================*/", "#if (FXAA_GLSL_100 == 1) || (FXAA_GLSL_120 == 1) || (FXAA_GLSL_130 == 1)", "    #define FxaaBool bool", "    #define FxaaDiscard discard", "    #define FxaaFloat float", "    #define FxaaFloat2 vec2", "    #define FxaaFloat3 vec3", "    #define FxaaFloat4 vec4", "    #define FxaaHalf float", "    #define FxaaHalf2 vec2", "    #define FxaaHalf3 vec3", "    #define FxaaHalf4 vec4", "    #define FxaaInt2 ivec2", "    #define FxaaSat(x) clamp(x, 0.0, 1.0)", "    #define FxaaTex sampler2D", "#else", "    #define FxaaBool bool", "    #define FxaaDiscard clip(-1)", "    #define FxaaFloat float", "    #define FxaaFloat2 float2", "    #define FxaaFloat3 float3", "    #define FxaaFloat4 float4", "    #define FxaaHalf half", "    #define FxaaHalf2 half2", "    #define FxaaHalf3 half3", "    #define FxaaHalf4 half4", "    #define FxaaSat(x) saturate(x)", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_GLSL_100 == 1)", "  #define FxaaTexTop(t, p) texture2D(t, p, 0.0)", "  #define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), 0.0)", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_GLSL_120 == 1)", "    // Requires,", "    //  #version 120", "    // And at least,", "    //  #extension GL_EXT_gpu_shader4 : enable", "    //  (or set FXAA_FAST_PIXEL_OFFSET 1 to work like DX9)", "    #define FxaaTexTop(t, p) texture2DLod(t, p, 0.0)", "    #if (FXAA_FAST_PIXEL_OFFSET == 1)", "        #define FxaaTexOff(t, p, o, r) texture2DLodOffset(t, p, 0.0, o)", "    #else", "        #define FxaaTexOff(t, p, o, r) texture2DLod(t, p + (o * r), 0.0)", "    #endif", "    #if (FXAA_GATHER4_ALPHA == 1)", "        // use #extension GL_ARB_gpu_shader5 : enable", "        #define FxaaTexAlpha4(t, p) textureGather(t, p, 3)", "        #define FxaaTexOffAlpha4(t, p, o) textureGatherOffset(t, p, o, 3)", "        #define FxaaTexGreen4(t, p) textureGather(t, p, 1)", "        #define FxaaTexOffGreen4(t, p, o) textureGatherOffset(t, p, o, 1)", "    #endif", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_GLSL_130 == 1)", '    // Requires "#version 130" or better', "    #define FxaaTexTop(t, p) textureLod(t, p, 0.0)", "    #define FxaaTexOff(t, p, o, r) textureLodOffset(t, p, 0.0, o)", "    #if (FXAA_GATHER4_ALPHA == 1)", "        // use #extension GL_ARB_gpu_shader5 : enable", "        #define FxaaTexAlpha4(t, p) textureGather(t, p, 3)", "        #define FxaaTexOffAlpha4(t, p, o) textureGatherOffset(t, p, o, 3)", "        #define FxaaTexGreen4(t, p) textureGather(t, p, 1)", "        #define FxaaTexOffGreen4(t, p, o) textureGatherOffset(t, p, o, 1)", "    #endif", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_HLSL_3 == 1)", "    #define FxaaInt2 float2", "    #define FxaaTex sampler2D", "    #define FxaaTexTop(t, p) tex2Dlod(t, float4(p, 0.0, 0.0))", "    #define FxaaTexOff(t, p, o, r) tex2Dlod(t, float4(p + (o * r), 0, 0))", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_HLSL_4 == 1)", "    #define FxaaInt2 int2", "    struct FxaaTex { SamplerState smpl; Texture2D tex; };", "    #define FxaaTexTop(t, p) t.tex.SampleLevel(t.smpl, p, 0.0)", "    #define FxaaTexOff(t, p, o, r) t.tex.SampleLevel(t.smpl, p, 0.0, o)", "#endif", "/*--------------------------------------------------------------------------*/", "#if (FXAA_HLSL_5 == 1)", "    #define FxaaInt2 int2", "    struct FxaaTex { SamplerState smpl; Texture2D tex; };", "    #define FxaaTexTop(t, p) t.tex.SampleLevel(t.smpl, p, 0.0)", "    #define FxaaTexOff(t, p, o, r) t.tex.SampleLevel(t.smpl, p, 0.0, o)", "    #define FxaaTexAlpha4(t, p) t.tex.GatherAlpha(t.smpl, p)", "    #define FxaaTexOffAlpha4(t, p, o) t.tex.GatherAlpha(t.smpl, p, o)", "    #define FxaaTexGreen4(t, p) t.tex.GatherGreen(t.smpl, p)", "    #define FxaaTexOffGreen4(t, p, o) t.tex.GatherGreen(t.smpl, p, o)", "#endif", "", "", "/*============================================================================", "                   GREEN AS LUMA OPTION SUPPORT FUNCTION", "============================================================================*/", "#if (FXAA_GREEN_AS_LUMA == 0)", "    FxaaFloat FxaaLuma(FxaaFloat4 rgba) { return rgba.w; }", "#else", "    FxaaFloat FxaaLuma(FxaaFloat4 rgba) { return rgba.y; }", "#endif", "", "", "", "", "/*============================================================================", "", "                             FXAA3 QUALITY - PC", "", "============================================================================*/", "#if (FXAA_PC == 1)", "/*--------------------------------------------------------------------------*/", "FxaaFloat4 FxaaPixelShader(", "    //", "    // Use noperspective interpolation here (turn off perspective interpolation).", "    // {xy} = center of pixel", "    FxaaFloat2 pos,", "    //", "    // Used only for FXAA Console, and not used on the 360 version.", "    // Use noperspective interpolation here (turn off perspective interpolation).", "    // {xy_} = upper left of pixel", "    // {_zw} = lower right of pixel", "    FxaaFloat4 fxaaConsolePosPos,", "    //", "    // Input color texture.", "    // {rgb_} = color in linear or perceptual color space", "    // if (FXAA_GREEN_AS_LUMA == 0)", "    //     {__a} = luma in perceptual color space (not linear)", "    FxaaTex tex,", "    //", "    // Only used on the optimized 360 version of FXAA Console.", '    // For everything but 360, just use the same input here as for "tex".', "    // For 360, same texture, just alias with a 2nd sampler.", "    // This sampler needs to have an exponent bias of -1.", "    FxaaTex fxaaConsole360TexExpBiasNegOne,", "    //", "    // Only used on the optimized 360 version of FXAA Console.", '    // For everything but 360, just use the same input here as for "tex".', "    // For 360, same texture, just alias with a 3nd sampler.", "    // This sampler needs to have an exponent bias of -2.", "    FxaaTex fxaaConsole360TexExpBiasNegTwo,", "    //", "    // Only used on FXAA Quality.", "    // This must be from a constant/uniform.", "    // {x_} = 1.0/screenWidthInPixels", "    // {_y} = 1.0/screenHeightInPixels", "    FxaaFloat2 fxaaQualityRcpFrame,", "    //", "    // Only used on FXAA Console.", "    // This must be from a constant/uniform.", "    // This effects sub-pixel AA quality and inversely sharpness.", "    //   Where N ranges between,", "    //     N = 0.50 (default)", "    //     N = 0.33 (sharper)", "    // {x__} = -N/screenWidthInPixels", "    // {_y_} = -N/screenHeightInPixels", "    // {_z_} =  N/screenWidthInPixels", "    // {__w} =  N/screenHeightInPixels", "    FxaaFloat4 fxaaConsoleRcpFrameOpt,", "    //", "    // Only used on FXAA Console.", "    // Not used on 360, but used on PS3 and PC.", "    // This must be from a constant/uniform.", "    // {x__} = -2.0/screenWidthInPixels", "    // {_y_} = -2.0/screenHeightInPixels", "    // {_z_} =  2.0/screenWidthInPixels", "    // {__w} =  2.0/screenHeightInPixels", "    FxaaFloat4 fxaaConsoleRcpFrameOpt2,", "    //", "    // Only used on FXAA Console.", "    // Only used on 360 in place of fxaaConsoleRcpFrameOpt2.", "    // This must be from a constant/uniform.", "    // {x__} =  8.0/screenWidthInPixels", "    // {_y_} =  8.0/screenHeightInPixels", "    // {_z_} = -4.0/screenWidthInPixels", "    // {__w} = -4.0/screenHeightInPixels", "    FxaaFloat4 fxaaConsole360RcpFrameOpt2,", "    //", "    // Only used on FXAA Quality.", "    // This used to be the FXAA_QUALITY_SUBPIX define.", "    // It is here now to allow easier tuning.", "    // Choose the amount of sub-pixel aliasing removal.", "    // This can effect sharpness.", "    //   1.00 - upper limit (softer)", "    //   0.75 - default amount of filtering", "    //   0.50 - lower limit (sharper, less sub-pixel aliasing removal)", "    //   0.25 - almost off", "    //   0.00 - completely off", "    FxaaFloat fxaaQualitySubpix,", "    //", "    // Only used on FXAA Quality.", "    // This used to be the FXAA_QUALITY_EDGE_THRESHOLD define.", "    // It is here now to allow easier tuning.", "    // The minimum amount of local contrast required to apply algorithm.", "    //   0.333 - too little (faster)", "    //   0.250 - low quality", "    //   0.166 - default", "    //   0.125 - high quality", "    //   0.063 - overkill (slower)", "    FxaaFloat fxaaQualityEdgeThreshold,", "    //", "    // Only used on FXAA Quality.", "    // This used to be the FXAA_QUALITY_EDGE_THRESHOLD_MIN define.", "    // It is here now to allow easier tuning.", "    // Trims the algorithm from processing darks.", "    //   0.0833 - upper limit (default, the start of visible unfiltered edges)", "    //   0.0625 - high quality (faster)", "    //   0.0312 - visible limit (slower)", "    // Special notes when using FXAA_GREEN_AS_LUMA,", "    //   Likely want to set this to zero.", "    //   As colors that are mostly not-green", "    //   will appear very dark in the green channel!", "    //   Tune by looking at mostly non-green content,", "    //   then start at zero and increase until aliasing is a problem.", "    FxaaFloat fxaaQualityEdgeThresholdMin,", "    //", "    // Only used on FXAA Console.", "    // This used to be the FXAA_CONSOLE_EDGE_SHARPNESS define.", "    // It is here now to allow easier tuning.", "    // This does not effect PS3, as this needs to be compiled in.", "    //   Use FXAA_CONSOLE_PS3_EDGE_SHARPNESS for PS3.", "    //   Due to the PS3 being ALU bound,", "    //   there are only three safe values here: 2 and 4 and 8.", "    //   These options use the shaders ability to a free *|/ by 2|4|8.", "    // For all other platforms can be a non-power of two.", "    //   8.0 is sharper (default!!!)", "    //   4.0 is softer", "    //   2.0 is really soft (good only for vector graphics inputs)", "    FxaaFloat fxaaConsoleEdgeSharpness,", "    //", "    // Only used on FXAA Console.", "    // This used to be the FXAA_CONSOLE_EDGE_THRESHOLD define.", "    // It is here now to allow easier tuning.", "    // This does not effect PS3, as this needs to be compiled in.", "    //   Use FXAA_CONSOLE_PS3_EDGE_THRESHOLD for PS3.", "    //   Due to the PS3 being ALU bound,", "    //   there are only two safe values here: 1/4 and 1/8.", "    //   These options use the shaders ability to a free *|/ by 2|4|8.", "    // The console setting has a different mapping than the quality setting.", "    // Other platforms can use other values.", "    //   0.125 leaves less aliasing, but is softer (default!!!)", "    //   0.25 leaves more aliasing, and is sharper", "    FxaaFloat fxaaConsoleEdgeThreshold,", "    //", "    // Only used on FXAA Console.", "    // This used to be the FXAA_CONSOLE_EDGE_THRESHOLD_MIN define.", "    // It is here now to allow easier tuning.", "    // Trims the algorithm from processing darks.", "    // The console setting has a different mapping than the quality setting.", "    // This only applies when FXAA_EARLY_EXIT is 1.", "    // This does not apply to PS3,", "    // PS3 was simplified to avoid more shader instructions.", "    //   0.06 - faster but more aliasing in darks", "    //   0.05 - default", "    //   0.04 - slower and less aliasing in darks", "    // Special notes when using FXAA_GREEN_AS_LUMA,", "    //   Likely want to set this to zero.", "    //   As colors that are mostly not-green", "    //   will appear very dark in the green channel!", "    //   Tune by looking at mostly non-green content,", "    //   then start at zero and increase until aliasing is a problem.", "    FxaaFloat fxaaConsoleEdgeThresholdMin,", "    //", "    // Extra constants for 360 FXAA Console only.", "    // Use zeros or anything else for other platforms.", "    // These must be in physical constant registers and NOT immedates.", "    // Immedates will result in compiler un-optimizing.", "    // {xyzw} = float4(1.0, -1.0, 0.25, -0.25)", "    FxaaFloat4 fxaaConsole360ConstDir", ") {", "/*--------------------------------------------------------------------------*/", "    FxaaFloat2 posM;", "    posM.x = pos.x;", "    posM.y = pos.y;", "    #if (FXAA_GATHER4_ALPHA == 1)", "        #if (FXAA_DISCARD == 0)", "            FxaaFloat4 rgbyM = FxaaTexTop(tex, posM);", "            #if (FXAA_GREEN_AS_LUMA == 0)", "                #define lumaM rgbyM.w", "            #else", "                #define lumaM rgbyM.y", "            #endif", "        #endif", "        #if (FXAA_GREEN_AS_LUMA == 0)", "            FxaaFloat4 luma4A = FxaaTexAlpha4(tex, posM);", "            FxaaFloat4 luma4B = FxaaTexOffAlpha4(tex, posM, FxaaInt2(-1, -1));", "        #else", "            FxaaFloat4 luma4A = FxaaTexGreen4(tex, posM);", "            FxaaFloat4 luma4B = FxaaTexOffGreen4(tex, posM, FxaaInt2(-1, -1));", "        #endif", "        #if (FXAA_DISCARD == 1)", "            #define lumaM luma4A.w", "        #endif", "        #define lumaE luma4A.z", "        #define lumaS luma4A.x", "        #define lumaSE luma4A.y", "        #define lumaNW luma4B.w", "        #define lumaN luma4B.z", "        #define lumaW luma4B.x", "    #else", "        FxaaFloat4 rgbyM = FxaaTexTop(tex, posM);", "        #if (FXAA_GREEN_AS_LUMA == 0)", "            #define lumaM rgbyM.w", "        #else", "            #define lumaM rgbyM.y", "        #endif", "        #if (FXAA_GLSL_100 == 1)", "          FxaaFloat lumaS = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 0.0, 1.0), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0, 0.0), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaN = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 0.0,-1.0), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0, 0.0), fxaaQualityRcpFrame.xy));", "        #else", "          FxaaFloat lumaS = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 0, 1), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1, 0), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaN = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 0,-1), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 0), fxaaQualityRcpFrame.xy));", "        #endif", "    #endif", "/*--------------------------------------------------------------------------*/", "    FxaaFloat maxSM = max(lumaS, lumaM);", "    FxaaFloat minSM = min(lumaS, lumaM);", "    FxaaFloat maxESM = max(lumaE, maxSM);", "    FxaaFloat minESM = min(lumaE, minSM);", "    FxaaFloat maxWN = max(lumaN, lumaW);", "    FxaaFloat minWN = min(lumaN, lumaW);", "    FxaaFloat rangeMax = max(maxWN, maxESM);", "    FxaaFloat rangeMin = min(minWN, minESM);", "    FxaaFloat rangeMaxScaled = rangeMax * fxaaQualityEdgeThreshold;", "    FxaaFloat range = rangeMax - rangeMin;", "    FxaaFloat rangeMaxClamped = max(fxaaQualityEdgeThresholdMin, rangeMaxScaled);", "    FxaaBool earlyExit = range < rangeMaxClamped;", "/*--------------------------------------------------------------------------*/", "    if(earlyExit)", "        #if (FXAA_DISCARD == 1)", "            FxaaDiscard;", "        #else", "            return rgbyM;", "        #endif", "/*--------------------------------------------------------------------------*/", "    #if (FXAA_GATHER4_ALPHA == 0)", "        #if (FXAA_GLSL_100 == 1)", "          FxaaFloat lumaNW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0,-1.0), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaSE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0, 1.0), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0,-1.0), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0, 1.0), fxaaQualityRcpFrame.xy));", "        #else", "          FxaaFloat lumaNW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1,-1), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaSE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1, 1), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1,-1), fxaaQualityRcpFrame.xy));", "          FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 1), fxaaQualityRcpFrame.xy));", "        #endif", "    #else", "        FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(1, -1), fxaaQualityRcpFrame.xy));", "        FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 1), fxaaQualityRcpFrame.xy));", "    #endif", "/*--------------------------------------------------------------------------*/", "    FxaaFloat lumaNS = lumaN + lumaS;", "    FxaaFloat lumaWE = lumaW + lumaE;", "    FxaaFloat subpixRcpRange = 1.0/range;", "    FxaaFloat subpixNSWE = lumaNS + lumaWE;", "    FxaaFloat edgeHorz1 = (-2.0 * lumaM) + lumaNS;", "    FxaaFloat edgeVert1 = (-2.0 * lumaM) + lumaWE;", "/*--------------------------------------------------------------------------*/", "    FxaaFloat lumaNESE = lumaNE + lumaSE;", "    FxaaFloat lumaNWNE = lumaNW + lumaNE;", "    FxaaFloat edgeHorz2 = (-2.0 * lumaE) + lumaNESE;", "    FxaaFloat edgeVert2 = (-2.0 * lumaN) + lumaNWNE;", "/*--------------------------------------------------------------------------*/", "    FxaaFloat lumaNWSW = lumaNW + lumaSW;", "    FxaaFloat lumaSWSE = lumaSW + lumaSE;", "    FxaaFloat edgeHorz4 = (abs(edgeHorz1) * 2.0) + abs(edgeHorz2);", "    FxaaFloat edgeVert4 = (abs(edgeVert1) * 2.0) + abs(edgeVert2);", "    FxaaFloat edgeHorz3 = (-2.0 * lumaW) + lumaNWSW;", "    FxaaFloat edgeVert3 = (-2.0 * lumaS) + lumaSWSE;", "    FxaaFloat edgeHorz = abs(edgeHorz3) + edgeHorz4;", "    FxaaFloat edgeVert = abs(edgeVert3) + edgeVert4;", "/*--------------------------------------------------------------------------*/", "    FxaaFloat subpixNWSWNESE = lumaNWSW + lumaNESE;", "    FxaaFloat lengthSign = fxaaQualityRcpFrame.x;", "    FxaaBool horzSpan = edgeHorz >= edgeVert;", "    FxaaFloat subpixA = subpixNSWE * 2.0 + subpixNWSWNESE;", "/*--------------------------------------------------------------------------*/", "    if(!horzSpan) lumaN = lumaW;", "    if(!horzSpan) lumaS = lumaE;", "    if(horzSpan) lengthSign = fxaaQualityRcpFrame.y;", "    FxaaFloat subpixB = (subpixA * (1.0/12.0)) - lumaM;", "/*--------------------------------------------------------------------------*/", "    FxaaFloat gradientN = lumaN - lumaM;", "    FxaaFloat gradientS = lumaS - lumaM;", "    FxaaFloat lumaNN = lumaN + lumaM;", "    FxaaFloat lumaSS = lumaS + lumaM;", "    FxaaBool pairN = abs(gradientN) >= abs(gradientS);", "    FxaaFloat gradient = max(abs(gradientN), abs(gradientS));", "    if(pairN) lengthSign = -lengthSign;", "    FxaaFloat subpixC = FxaaSat(abs(subpixB) * subpixRcpRange);", "/*--------------------------------------------------------------------------*/", "    FxaaFloat2 posB;", "    posB.x = posM.x;", "    posB.y = posM.y;", "    FxaaFloat2 offNP;", "    offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;", "    offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;", "    if(!horzSpan) posB.x += lengthSign * 0.5;", "    if( horzSpan) posB.y += lengthSign * 0.5;", "/*--------------------------------------------------------------------------*/", "    FxaaFloat2 posN;", "    posN.x = posB.x - offNP.x * FXAA_QUALITY_P0;", "    posN.y = posB.y - offNP.y * FXAA_QUALITY_P0;", "    FxaaFloat2 posP;", "    posP.x = posB.x + offNP.x * FXAA_QUALITY_P0;", "    posP.y = posB.y + offNP.y * FXAA_QUALITY_P0;", "    FxaaFloat subpixD = ((-2.0)*subpixC) + 3.0;", "    FxaaFloat lumaEndN = FxaaLuma(FxaaTexTop(tex, posN));", "    FxaaFloat subpixE = subpixC * subpixC;", "    FxaaFloat lumaEndP = FxaaLuma(FxaaTexTop(tex, posP));", "/*--------------------------------------------------------------------------*/", "    if(!pairN) lumaNN = lumaSS;", "    FxaaFloat gradientScaled = gradient * 1.0/4.0;", "    FxaaFloat lumaMM = lumaM - lumaNN * 0.5;", "    FxaaFloat subpixF = subpixD * subpixE;", "    FxaaBool lumaMLTZero = lumaMM < 0.0;", "/*--------------------------------------------------------------------------*/", "    lumaEndN -= lumaNN * 0.5;", "    lumaEndP -= lumaNN * 0.5;", "    FxaaBool doneN = abs(lumaEndN) >= gradientScaled;", "    FxaaBool doneP = abs(lumaEndP) >= gradientScaled;", "    if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P1;", "    if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P1;", "    FxaaBool doneNP = (!doneN) || (!doneP);", "    if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P1;", "    if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P1;", "/*--------------------------------------------------------------------------*/", "    if(doneNP) {", "        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "        doneN = abs(lumaEndN) >= gradientScaled;", "        doneP = abs(lumaEndP) >= gradientScaled;", "        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P2;", "        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P2;", "        doneNP = (!doneN) || (!doneP);", "        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P2;", "        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P2;", "/*--------------------------------------------------------------------------*/", "        #if (FXAA_QUALITY_PS > 3)", "        if(doneNP) {", "            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "            doneN = abs(lumaEndN) >= gradientScaled;", "            doneP = abs(lumaEndP) >= gradientScaled;", "            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P3;", "            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P3;", "            doneNP = (!doneN) || (!doneP);", "            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P3;", "            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P3;", "/*--------------------------------------------------------------------------*/", "            #if (FXAA_QUALITY_PS > 4)", "            if(doneNP) {", "                if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "                if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "                if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "                if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "                doneN = abs(lumaEndN) >= gradientScaled;", "                doneP = abs(lumaEndP) >= gradientScaled;", "                if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P4;", "                if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P4;", "                doneNP = (!doneN) || (!doneP);", "                if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P4;", "                if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P4;", "/*--------------------------------------------------------------------------*/", "                #if (FXAA_QUALITY_PS > 5)", "                if(doneNP) {", "                    if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "                    if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "                    if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "                    if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "                    doneN = abs(lumaEndN) >= gradientScaled;", "                    doneP = abs(lumaEndP) >= gradientScaled;", "                    if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P5;", "                    if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P5;", "                    doneNP = (!doneN) || (!doneP);", "                    if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P5;", "                    if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P5;", "/*--------------------------------------------------------------------------*/", "                    #if (FXAA_QUALITY_PS > 6)", "                    if(doneNP) {", "                        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "                        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "                        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "                        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "                        doneN = abs(lumaEndN) >= gradientScaled;", "                        doneP = abs(lumaEndP) >= gradientScaled;", "                        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P6;", "                        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P6;", "                        doneNP = (!doneN) || (!doneP);", "                        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P6;", "                        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P6;", "/*--------------------------------------------------------------------------*/", "                        #if (FXAA_QUALITY_PS > 7)", "                        if(doneNP) {", "                            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "                            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "                            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "                            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "                            doneN = abs(lumaEndN) >= gradientScaled;", "                            doneP = abs(lumaEndP) >= gradientScaled;", "                            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P7;", "                            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P7;", "                            doneNP = (!doneN) || (!doneP);", "                            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P7;", "                            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P7;", "/*--------------------------------------------------------------------------*/", "    #if (FXAA_QUALITY_PS > 8)", "    if(doneNP) {", "        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "        doneN = abs(lumaEndN) >= gradientScaled;", "        doneP = abs(lumaEndP) >= gradientScaled;", "        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P8;", "        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P8;", "        doneNP = (!doneN) || (!doneP);", "        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P8;", "        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P8;", "/*--------------------------------------------------------------------------*/", "        #if (FXAA_QUALITY_PS > 9)", "        if(doneNP) {", "            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "            doneN = abs(lumaEndN) >= gradientScaled;", "            doneP = abs(lumaEndP) >= gradientScaled;", "            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P9;", "            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P9;", "            doneNP = (!doneN) || (!doneP);", "            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P9;", "            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P9;", "/*--------------------------------------------------------------------------*/", "            #if (FXAA_QUALITY_PS > 10)", "            if(doneNP) {", "                if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "                if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "                if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "                if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "                doneN = abs(lumaEndN) >= gradientScaled;", "                doneP = abs(lumaEndP) >= gradientScaled;", "                if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P10;", "                if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P10;", "                doneNP = (!doneN) || (!doneP);", "                if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P10;", "                if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P10;", "/*--------------------------------------------------------------------------*/", "                #if (FXAA_QUALITY_PS > 11)", "                if(doneNP) {", "                    if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "                    if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "                    if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "                    if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "                    doneN = abs(lumaEndN) >= gradientScaled;", "                    doneP = abs(lumaEndP) >= gradientScaled;", "                    if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P11;", "                    if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P11;", "                    doneNP = (!doneN) || (!doneP);", "                    if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P11;", "                    if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P11;", "/*--------------------------------------------------------------------------*/", "                    #if (FXAA_QUALITY_PS > 12)", "                    if(doneNP) {", "                        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));", "                        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));", "                        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;", "                        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;", "                        doneN = abs(lumaEndN) >= gradientScaled;", "                        doneP = abs(lumaEndP) >= gradientScaled;", "                        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P12;", "                        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P12;", "                        doneNP = (!doneN) || (!doneP);", "                        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P12;", "                        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P12;", "/*--------------------------------------------------------------------------*/", "                    }", "                    #endif", "/*--------------------------------------------------------------------------*/", "                }", "                #endif", "/*--------------------------------------------------------------------------*/", "            }", "            #endif", "/*--------------------------------------------------------------------------*/", "        }", "        #endif", "/*--------------------------------------------------------------------------*/", "    }", "    #endif", "/*--------------------------------------------------------------------------*/", "                        }", "                        #endif", "/*--------------------------------------------------------------------------*/", "                    }", "                    #endif", "/*--------------------------------------------------------------------------*/", "                }", "                #endif", "/*--------------------------------------------------------------------------*/", "            }", "            #endif", "/*--------------------------------------------------------------------------*/", "        }", "        #endif", "/*--------------------------------------------------------------------------*/", "    }", "/*--------------------------------------------------------------------------*/", "    FxaaFloat dstN = posM.x - posN.x;", "    FxaaFloat dstP = posP.x - posM.x;", "    if(!horzSpan) dstN = posM.y - posN.y;", "    if(!horzSpan) dstP = posP.y - posM.y;", "/*--------------------------------------------------------------------------*/", "    FxaaBool goodSpanN = (lumaEndN < 0.0) != lumaMLTZero;", "    FxaaFloat spanLength = (dstP + dstN);", "    FxaaBool goodSpanP = (lumaEndP < 0.0) != lumaMLTZero;", "    FxaaFloat spanLengthRcp = 1.0/spanLength;", "/*--------------------------------------------------------------------------*/", "    FxaaBool directionN = dstN < dstP;", "    FxaaFloat dst = min(dstN, dstP);", "    FxaaBool goodSpan = directionN ? goodSpanN : goodSpanP;", "    FxaaFloat subpixG = subpixF * subpixF;", "    FxaaFloat pixelOffset = (dst * (-spanLengthRcp)) + 0.5;", "    FxaaFloat subpixH = subpixG * fxaaQualitySubpix;", "/*--------------------------------------------------------------------------*/", "    FxaaFloat pixelOffsetGood = goodSpan ? pixelOffset : 0.0;", "    FxaaFloat pixelOffsetSubpix = max(pixelOffsetGood, subpixH);", "    if(!horzSpan) posM.x += pixelOffsetSubpix * lengthSign;", "    if( horzSpan) posM.y += pixelOffsetSubpix * lengthSign;", "    #if (FXAA_DISCARD == 1)", "        return FxaaTexTop(tex, posM);", "    #else", "        return FxaaFloat4(FxaaTexTop(tex, posM).xyz, lumaM);", "    #endif", "}", "/*==========================================================================*/", "#endif", "", "void main() {", "  gl_FragColor = FxaaPixelShader(", "    vUv,", "    vec4(0.0),", "    tDiffuse,", "    tDiffuse,", "    tDiffuse,", "    resolution,", "    vec4(0.0),", "    vec4(0.0),", "    vec4(0.0),", "    0.75,", "    0.166,", "    0.0833,", "    0.0,", "    0.0,", "    0.0,", "    vec4(0.0)", "  );", "", "  // TODO avoid querying texture twice for same texel", "  gl_FragColor.a = texture2D(tDiffuse, vUv).a;", "}"].join("\n")
  }, THREE.FilmPass = function (e, t, a, n) {
    THREE.Pass.call(this), void 0 === THREE.FilmShader && console.error("THREE.FilmPass relies on THREE.FilmShader");
    var o = THREE.FilmShader;
    this.uniforms = THREE.UniformsUtils.clone(o.uniforms), this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: o.vertexShader,
      fragmentShader: o.fragmentShader
    }), void 0 !== n && (this.uniforms.grayscale.value = n), void 0 !== e && (this.uniforms.nIntensity.value = e), void 0 !== t && (this.uniforms.sIntensity.value = t), void 0 !== a && (this.uniforms.sCount.value = a), this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), this.scene = new THREE.Scene, this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null), this.quad.frustumCulled = !1, this.scene.add(this.quad)
  }, THREE.FilmPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
    constructor: THREE.FilmPass,
    render: function (e, t, a, n, o) {
      this.uniforms.tDiffuse.value = a.texture, this.uniforms.time.value += n, this.quad.material = this.material, this.renderToScreen ? e.render(this.scene, this.camera) : e.render(this.scene, this.camera, t, this.clear)
    }
  }), THREE.FilmShader = {
    uniforms: {
      tDiffuse: {
        value: null
      },
      time: {
        value: 0
      },
      nIntensity: {
        value: .5
      },
      sIntensity: {
        value: .05
      },
      sCount: {
        value: 4096
      },
      grayscale: {
        value: 1
      }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["#include <common>", "uniform float time;", "uniform bool grayscale;", "uniform float nIntensity;", "uniform float sIntensity;", "uniform float sCount;", "uniform sampler2D tDiffuse;", "varying vec2 vUv;", "void main() {", "vec4 cTextureScreen = texture2D( tDiffuse, vUv );", "float dx = rand( vUv + time );", "vec3 cResult = cTextureScreen.rgb + cTextureScreen.rgb * clamp( 0.1 + dx, 0.0, 1.0 );", "vec2 sc = vec2( sin( vUv.y * sCount ), cos( vUv.y * sCount ) );", "cResult += cTextureScreen.rgb * vec3( sc.x, sc.y, sc.x ) * sIntensity;", "cResult = cTextureScreen.rgb + clamp( nIntensity, 0.0,1.0 ) * ( cResult - cTextureScreen.rgb );", "if( grayscale ) {", "cResult = vec3( cResult.r * 0.3 + cResult.g * 0.59 + cResult.b * 0.11 );", "}", "gl_FragColor =  vec4( cResult, cTextureScreen.a );", "}"].join("\n")
  }, THREE.LuminosityHighPassShader = {
    shaderID: "luminosityHighPass",
    uniforms: {
      tDiffuse: {
        type: "t",
        value: null
      },
      luminosityThreshold: {
        type: "f",
        value: 1
      },
      smoothWidth: {
        type: "f",
        value: 1
      },
      defaultColor: {
        type: "c",
        value: new THREE.Color(0)
      },
      defaultOpacity: {
        type: "f",
        value: 0
      }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform vec3 defaultColor;", "uniform float defaultOpacity;", "uniform float luminosityThreshold;", "uniform float smoothWidth;", "varying vec2 vUv;", "void main() {", "vec4 texel = texture2D( tDiffuse, vUv );", "vec3 luma = vec3( 0.299, 0.587, 0.114 );", "float v = dot( texel.xyz, luma );", "vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );", "float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );", "gl_FragColor = mix( outputColor, texel, alpha );", "}"].join("\n")
  }, THREE.OrbitControls = function (e, t) {
    var a, n, o, i, r;
    this.object = e, this.domElement = void 0 !== t ? t : document, this.enabled = !0, this.target = new THREE.Vector3, this.minDistance = 0, this.maxDistance = 1 / 0, this.minZoom = 0, this.maxZoom = 1 / 0, this.minPolarAngle = 0, this.maxPolarAngle = Math.PI, this.minAzimuthAngle = -1 / 0, this.maxAzimuthAngle = 1 / 0, this.enableDamping = !1, this.dampingFactor = .25, this.enableZoom = !0, this.zoomSpeed = 1, this.enableRotate = !0, this.rotateSpeed = 1, this.enablePan = !0, this.panningMode = THREE.ScreenSpacePanning, this.keyPanSpeed = 7, this.autoRotate = !1, this.autoRotateSpeed = 2, this.enableKeys = !0, this.keys = {
      LEFT: 37,
      UP: 38,
      RIGHT: 39,
      BOTTOM: 40
    }, this.mouseButtons = {
      ORBIT: THREE.MOUSE.LEFT,
      ZOOM: THREE.MOUSE.MIDDLE,
      PAN: THREE.MOUSE.RIGHT
    }, this.target0 = this.target.clone(), this.position0 = this.object.position.clone(), this.zoom0 = this.object.zoom, this.getPolarAngle = function () {
      return p.phi
    }, this.getAzimuthalAngle = function () {
      return p.theta
    }, this.saveState = function () {
      s.target0.copy(s.target), s.position0.copy(s.object.position), s.zoom0 = s.object.zoom
    }, this.reset = function () {
      s.target.copy(s.target0), s.object.position.copy(s.position0), s.object.zoom = s.zoom0, s.object.updateProjectionMatrix(), s.dispatchEvent(l), s.update(), f = c.NONE
    }, this.update = (a = new THREE.Vector3, n = (new THREE.Quaternion).setFromUnitVectors(e.up, new THREE.Vector3(0, 1, 0)), o = n.clone().inverse(), i = new THREE.Vector3, r = new THREE.Quaternion, function () {
      var e = s.object.position;
      return a.copy(e).sub(s.target), a.applyQuaternion(n), p.setFromVector3(a), s.autoRotate && f === c.NONE && S(2 * Math.PI / 60 / 60 * s.autoRotateSpeed), p.theta += m.theta, p.phi += m.phi, p.theta = Math.max(s.minAzimuthAngle, Math.min(s.maxAzimuthAngle, p.theta)), p.phi = Math.max(s.minPolarAngle, Math.min(s.maxPolarAngle, p.phi)), p.makeSafe(), p.radius *= _, p.radius = Math.max(s.minDistance, Math.min(s.maxDistance, p.radius)), s.target.add(g), a.setFromSpherical(p), a.applyQuaternion(o), e.copy(s.target).add(a), s.object.lookAt(s.target), !0 === s.enableDamping ? (m.theta *= 1 - s.dampingFactor, m.phi *= 1 - s.dampingFactor, g.multiplyScalar(1 - s.dampingFactor)) : (m.set(0, 0, 0), g.set(0, 0, 0)), _ = 1, !(!(A || i.distanceToSquared(s.object.position) > h || 8 * (1 - r.dot(s.object.quaternion)) > h) || (s.dispatchEvent(l), i.copy(s.object.position), r.copy(s.object.quaternion), A = !1))
    }), this.dispose = function () {
      s.domElement.removeEventListener("contextmenu", V, !1), s.domElement.removeEventListener("mousedown", k, !1), s.domElement.removeEventListener("wheel", Q, !1), s.domElement.removeEventListener("touchstart", j, !1), s.domElement.removeEventListener("touchend", z, !1), s.domElement.removeEventListener("touchmove", G, !1), document.removeEventListener("mousemove", D, !1), document.removeEventListener("mouseup", Y, !1), window.removeEventListener("keydown", B, !1)
    };
    var s = this,
      l = {
        type: "change"
      },
      d = {
        type: "start"
      },
      u = {
        type: "end"
      },
      c = {
        NONE: -1,
        ROTATE: 0,
        DOLLY: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_DOLLY: 4,
        TOUCH_PAN: 5
      },
      f = c.NONE,
      h = 1e-6,
      p = new THREE.Spherical,
      m = new THREE.Spherical,
      _ = 1,
      g = new THREE.Vector3,
      A = !1,
      v = new THREE.Vector2,
      x = new THREE.Vector2,
      b = new THREE.Vector2,
      E = new THREE.Vector2,
      T = new THREE.Vector2,
      y = new THREE.Vector2,
      F = new THREE.Vector2,
      P = new THREE.Vector2,
      w = new THREE.Vector2;

    function N() {
      return Math.pow(.95, s.zoomSpeed)
    }

    function S(e) {
      m.theta -= e
    }

    function R(e) {
      m.phi -= e
    }
    var L, C, I, H = (L = new THREE.Vector3, function (e, t) {
        L.setFromMatrixColumn(t, 0), L.multiplyScalar(-e), g.add(L)
      }),
      U = (C = new THREE.Vector3, function (e, t) {
        switch (s.panningMode) {
          case THREE.ScreenSpacePanning:
            C.setFromMatrixColumn(t, 1);
            break;
          case THREE.HorizontalPanning:
            C.setFromMatrixColumn(t, 0), C.crossVectors(s.object.up, C)
        }
        C.multiplyScalar(e), g.add(C)
      }),
      O = (I = new THREE.Vector3, function (e, t) {
        var a = s.domElement === document ? s.domElement.body : s.domElement;
        if (s.object.isPerspectiveCamera) {
          var n = s.object.position;
          I.copy(n).sub(s.target);
          var o = I.length();
          o *= Math.tan(s.object.fov / 2 * Math.PI / 180), H(2 * e * o / a.clientHeight, s.object.matrix), U(2 * t * o / a.clientHeight, s.object.matrix)
        } else s.object.isOrthographicCamera ? (H(e * (s.object.right - s.object.left) / s.object.zoom / a.clientWidth, s.object.matrix), U(t * (s.object.top - s.object.bottom) / s.object.zoom / a.clientHeight, s.object.matrix)) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."), s.enablePan = !1)
      });

    function M(e) {
      s.object.isPerspectiveCamera ? _ /= e : s.object.isOrthographicCamera ? (s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom * e)), s.object.updateProjectionMatrix(), A = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), s.enableZoom = !1)
    }

    function X(e) {
      s.object.isPerspectiveCamera ? _ *= e : s.object.isOrthographicCamera ? (s.object.zoom = Math.max(s.minZoom, Math.min(s.maxZoom, s.object.zoom / e)), s.object.updateProjectionMatrix(), A = !0) : (console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."), s.enableZoom = !1)
    }

    function k(e) {
      if (!1 !== s.enabled) {
        switch (e.preventDefault(), e.button) {
          case s.mouseButtons.ORBIT:
            if (!1 === s.enableRotate) return;
            n = e, v.set(n.clientX, n.clientY), f = c.ROTATE;
            break;
          case s.mouseButtons.ZOOM:
            if (!1 === s.enableZoom) return;
            a = e, F.set(a.clientX, a.clientY), f = c.DOLLY;
            break;
          case s.mouseButtons.PAN:
            if (!1 === s.enablePan) return;
            t = e, E.set(t.clientX, t.clientY), f = c.PAN
        }
        var t, a, n;
        f !== c.NONE && (document.addEventListener("mousemove", D, !1), document.addEventListener("mouseup", Y, !1), s.dispatchEvent(d))
      }
    }

    function D(e) {
      var t, a;
      if (!1 !== s.enabled) switch (e.preventDefault(), f) {
        case c.ROTATE:
          if (!1 === s.enableRotate) return;
          ! function (e) {
            x.set(e.clientX, e.clientY), b.subVectors(x, v);
            var t = s.domElement === document ? s.domElement.body : s.domElement;
            S(2 * Math.PI * b.x / t.clientWidth * s.rotateSpeed), R(2 * Math.PI * b.y / t.clientHeight * s.rotateSpeed), v.copy(x), s.update()
          }(e);
          break;
        case c.DOLLY:
          if (!1 === s.enableZoom) return;
          a = e, P.set(a.clientX, a.clientY), w.subVectors(P, F), 0 < w.y ? M(N()) : w.y < 0 && X(N()), F.copy(P), s.update();
          break;
        case c.PAN:
          if (!1 === s.enablePan) return;
          t = e, T.set(t.clientX, t.clientY), y.subVectors(T, E), O(y.x, y.y), E.copy(T), s.update()
      }
    }

    function Y(e) {
      !1 !== s.enabled && (document.removeEventListener("mousemove", D, !1), document.removeEventListener("mouseup", Y, !1), s.dispatchEvent(u), f = c.NONE)
    }

    function Q(e) {
      var t;
      !1 === s.enabled || !1 === s.enableZoom || f !== c.NONE && f !== c.ROTATE || (e.preventDefault(), e.stopPropagation(), s.dispatchEvent(d), (t = e).deltaY < 0 ? X(N()) : 0 < t.deltaY && M(N()), s.update(), s.dispatchEvent(u))
    }

    function B(e) {
      !1 !== s.enabled && !1 !== s.enableKeys && !1 !== s.enablePan && function (e) {
        switch (e.keyCode) {
          case s.keys.UP:
            O(0, s.keyPanSpeed), s.update();
            break;
          case s.keys.BOTTOM:
            O(0, -s.keyPanSpeed), s.update();
            break;
          case s.keys.LEFT:
            O(s.keyPanSpeed, 0), s.update();
            break;
          case s.keys.RIGHT:
            O(-s.keyPanSpeed, 0), s.update()
        }
      }(e)
    }

    function j(e) {
      if (!1 !== s.enabled) {
        switch (e.touches.length) {
          case 1:
            if (!1 === s.enableRotate) return;
            r = e, v.set(r.touches[0].pageX, r.touches[0].pageY), f = c.TOUCH_ROTATE;
            break;
          case 2:
            if (!1 === s.enableZoom) return;
            n = (a = e).touches[0].pageX - a.touches[1].pageX, o = a.touches[0].pageY - a.touches[1].pageY, i = Math.sqrt(n * n + o * o), F.set(0, i), f = c.TOUCH_DOLLY;
            break;
          case 3:
            if (!1 === s.enablePan) return;
            t = e, E.set(t.touches[0].pageX, t.touches[0].pageY), f = c.TOUCH_PAN;
            break;
          default:
            f = c.NONE
        }
        var t, a, n, o, i, r;
        f !== c.NONE && s.dispatchEvent(d)
      }
    }

    function G(e) {
      var t, a, n, o, i;
      if (!1 !== s.enabled) switch (e.preventDefault(), e.stopPropagation(), e.touches.length) {
        case 1:
          if (!1 === s.enableRotate) return;
          if (f !== c.TOUCH_ROTATE) return;
          ! function (e) {
            x.set(e.touches[0].pageX, e.touches[0].pageY), b.subVectors(x, v);
            var t = s.domElement === document ? s.domElement.body : s.domElement;
            S(2 * Math.PI * b.x / t.clientWidth * s.rotateSpeed), R(2 * Math.PI * b.y / t.clientHeight * s.rotateSpeed), v.copy(x), s.update()
          }(e);
          break;
        case 2:
          if (!1 === s.enableZoom) return;
          if (f !== c.TOUCH_DOLLY) return;
          n = (a = e).touches[0].pageX - a.touches[1].pageX, o = a.touches[0].pageY - a.touches[1].pageY, i = Math.sqrt(n * n + o * o), P.set(0, i), w.subVectors(P, F), 0 < w.y ? X(N()) : w.y < 0 && M(N()), F.copy(P), s.update();
          break;
        case 3:
          if (!1 === s.enablePan) return;
          if (f !== c.TOUCH_PAN) return;
          t = e, T.set(t.touches[0].pageX, t.touches[0].pageY), y.subVectors(T, E), O(y.x, y.y), E.copy(T), s.update();
          break;
        default:
          f = c.NONE
      }
    }

    function z(e) {
      !1 !== s.enabled && (s.dispatchEvent(u), f = c.NONE)
    }

    function V(e) {
      !1 !== s.enabled && e.preventDefault()
    }
    s.domElement.addEventListener("contextmenu", V, !1), s.domElement.addEventListener("mousedown", k, !1), s.domElement.addEventListener("wheel", Q, !1), s.domElement.addEventListener("touchstart", j, !1), s.domElement.addEventListener("touchend", z, !1), s.domElement.addEventListener("touchmove", G, !1), window.addEventListener("keydown", B, !1), this.update()
  }, THREE.OrbitControls.prototype = Object.create(THREE.EventDispatcher.prototype), THREE.OrbitControls.prototype.constructor = THREE.OrbitControls, Object.defineProperties(THREE.OrbitControls.prototype, {
    center: {
      get: function () {
        return console.warn("THREE.OrbitControls: .center has been renamed to .target"), this.target
      }
    },
    noZoom: {
      get: function () {
        return console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), !this.enableZoom
      },
      set: function (e) {
        console.warn("THREE.OrbitControls: .noZoom has been deprecated. Use .enableZoom instead."), this.enableZoom = !e
      }
    },
    noRotate: {
      get: function () {
        return console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), !this.enableRotate
      },
      set: function (e) {
        console.warn("THREE.OrbitControls: .noRotate has been deprecated. Use .enableRotate instead."), this.enableRotate = !e
      }
    },
    noPan: {
      get: function () {
        return console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), !this.enablePan
      },
      set: function (e) {
        console.warn("THREE.OrbitControls: .noPan has been deprecated. Use .enablePan instead."), this.enablePan = !e
      }
    },
    noKeys: {
      get: function () {
        return console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), !this.enableKeys
      },
      set: function (e) {
        console.warn("THREE.OrbitControls: .noKeys has been deprecated. Use .enableKeys instead."), this.enableKeys = !e
      }
    },
    staticMoving: {
      get: function () {
        return console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), !this.enableDamping
      },
      set: function (e) {
        console.warn("THREE.OrbitControls: .staticMoving has been deprecated. Use .enableDamping instead."), this.enableDamping = !e
      }
    },
    dynamicDampingFactor: {
      get: function () {
        return console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.dampingFactor
      },
      set: function (e) {
        console.warn("THREE.OrbitControls: .dynamicDampingFactor has been renamed. Use .dampingFactor instead."), this.dampingFactor = e
      }
    }
  }), THREE.ScreenSpacePanning = 0, THREE.HorizontalPanning = 1, THREE.RenderPass = function (e, t, a, n, o) {
    THREE.Pass.call(this), this.scene = e, this.camera = t, this.overrideMaterial = a, this.clearColor = n, this.clearAlpha = void 0 !== o ? o : 0, this.clear = !0, this.clearDepth = !1, this.needsSwap = !1
  }, THREE.RenderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
    constructor: THREE.RenderPass,
    render: function (e, t, a, n, o) {
      var i, r, s = e.autoClear;
      e.autoClear = !1, this.scene.overrideMaterial = this.overrideMaterial, this.clearColor && (i = e.getClearColor().getHex(), r = e.getClearAlpha(), e.setClearColor(this.clearColor, this.clearAlpha)), this.clearDepth && e.clearDepth(), e.render(this.scene, this.camera, this.renderToScreen ? null : a, this.clear), this.clearColor && e.setClearColor(i, r), this.scene.overrideMaterial = null, e.autoClear = s
    }
  }), THREE.ShaderPass = function (e, t) {
    THREE.Pass.call(this), this.textureID = void 0 !== t ? t : "tDiffuse", e instanceof THREE.ShaderMaterial ? (this.uniforms = e.uniforms, this.material = e) : e && (this.uniforms = THREE.UniformsUtils.clone(e.uniforms), this.material = new THREE.ShaderMaterial({
      defines: Object.assign({}, e.defines),
      uniforms: this.uniforms,
      vertexShader: e.vertexShader,
      fragmentShader: e.fragmentShader
    })), this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), this.scene = new THREE.Scene, this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null), this.quad.frustumCulled = !1, this.scene.add(this.quad)
  }, THREE.ShaderPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
    constructor: THREE.ShaderPass,
    render: function (e, t, a, n, o) {
      this.uniforms[this.textureID] && (this.uniforms[this.textureID].value = a.texture), this.quad.material = this.material, this.renderToScreen ? e.render(this.scene, this.camera) : e.render(this.scene, this.camera, t, this.clear)
    }
  }), THREE.VerticalTiltShiftShader = {
    uniforms: {
      tDiffuse: {
        type: "t",
        value: null
      },
      focusPos: {
        type: "f",
        value: .35
      },
      amount: {
        type: "f",
        value: 1
      },
      brightness: {
        type: "f",
        value: .5
      }
    },
    vertexShader: ["varying vec2 vUv;", "void main() {", "vUv = uv;", "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", "}"].join("\n"),
    fragmentShader: ["uniform sampler2D tDiffuse;", "uniform float focusPos;", "uniform float amount;", "uniform float brightness;", "varying vec2 vUv;", "void main() {", "vec4 sum = vec4( 0.0 );", "float vv = abs( focusPos - vUv.y ) * amount;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * vv ) ) * 0.051 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * vv ) ) * 0.0918 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * vv ) ) * 0.12245 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * vv ) ) * 0.1531 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * vv ) ) * 0.1531 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * vv ) ) * 0.12245 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * vv ) ) * 0.0918 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * vv ) ) * 0.051 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * vv , vUv.y ) ) * 0.051 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * vv, vUv.y  ) ) * 0.0918 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * vv, vUv.y  ) ) * 0.12245 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * vv, vUv.y  ) ) * 0.1531 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * vv, vUv.y ) ) * 0.1531 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * vv, vUv.y  ) ) * 0.12245 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * vv, vUv.y  ) ) * 0.0918 * brightness;", "sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * vv, vUv.y ) ) * 0.051 * brightness;", "gl_FragColor = sum;", "}"].join("\n")
  }, THREE.UnrealBloomPass = function (e, t, a, n) {
    THREE.Pass.call(this), this.strength = void 0 !== t ? t : 1, this.radius = a, this.threshold = n, this.resolution = void 0 !== e ? new THREE.Vector2(e.x, e.y) : new THREE.Vector2(256, 256);
    var o = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat
    };
    this.renderTargetsHorizontal = [], this.renderTargetsVertical = [], this.nMips = 5;
    var i = Math.round(this.resolution.x / 2),
      r = Math.round(this.resolution.y / 2);
    this.renderTargetBright = new THREE.WebGLRenderTarget(i, r, o), this.renderTargetBright.texture.name = "UnrealBloomPass.bright", this.renderTargetBright.texture.generateMipmaps = !1;
    for (var s = 0; s < this.nMips; s++) {
      var l;
      (l = new THREE.WebGLRenderTarget(i, r, o)).texture.name = "UnrealBloomPass.h" + s, l.texture.generateMipmaps = !1, this.renderTargetsHorizontal.push(l), (l = new THREE.WebGLRenderTarget(i, r, o)).texture.name = "UnrealBloomPass.v" + s, l.texture.generateMipmaps = !1, this.renderTargetsVertical.push(l), i = Math.round(i / 2), r = Math.round(r / 2)
    }
    void 0 === THREE.LuminosityHighPassShader && console.error("THREE.UnrealBloomPass relies on THREE.LuminosityHighPassShader");
    var d = THREE.LuminosityHighPassShader;
    this.highPassUniforms = THREE.UniformsUtils.clone(d.uniforms), this.highPassUniforms.luminosityThreshold.value = n, this.highPassUniforms.smoothWidth.value = .01, this.materialHighPassFilter = new THREE.ShaderMaterial({
      uniforms: this.highPassUniforms,
      vertexShader: d.vertexShader,
      fragmentShader: d.fragmentShader,
      defines: {}
    }), this.separableBlurMaterials = [];
    var u = [3, 5, 7, 9, 11];
    for (i = Math.round(this.resolution.x / 2), r = Math.round(this.resolution.y / 2), s = 0; s < this.nMips; s++) this.separableBlurMaterials.push(this.getSeperableBlurMaterial(u[s])), this.separableBlurMaterials[s].uniforms.texSize.value = new THREE.Vector2(i, r), i = Math.round(i / 2), r = Math.round(r / 2);
    this.compositeMaterial = this.getCompositeMaterial(this.nMips), this.compositeMaterial.uniforms.blurTexture1.value = this.renderTargetsVertical[0].texture, this.compositeMaterial.uniforms.blurTexture2.value = this.renderTargetsVertical[1].texture, this.compositeMaterial.uniforms.blurTexture3.value = this.renderTargetsVertical[2].texture, this.compositeMaterial.uniforms.blurTexture4.value = this.renderTargetsVertical[3].texture, this.compositeMaterial.uniforms.blurTexture5.value = this.renderTargetsVertical[4].texture, this.compositeMaterial.uniforms.bloomStrength.value = t, this.compositeMaterial.uniforms.bloomRadius.value = .1, this.compositeMaterial.needsUpdate = !0;
    this.compositeMaterial.uniforms.bloomFactors.value = [1, .8, .6, .4, .2], this.bloomTintColors = [new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 1, 1), new THREE.Vector3(1, 1, 1)], this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, void 0 === THREE.CopyShader && console.error("THREE.BloomPass relies on THREE.CopyShader");
    var c = THREE.CopyShader;
    this.copyUniforms = THREE.UniformsUtils.clone(c.uniforms), this.copyUniforms.opacity.value = 1, this.materialCopy = new THREE.ShaderMaterial({
      uniforms: this.copyUniforms,
      vertexShader: c.vertexShader,
      fragmentShader: c.fragmentShader,
      blending: THREE.AdditiveBlending,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0
    }), this.enabled = !0, this.needsSwap = !1, this.oldClearColor = new THREE.Color, this.oldClearAlpha = 1, this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1), this.scene = new THREE.Scene, this.basic = new THREE.MeshBasicMaterial, this.quad = new THREE.Mesh(new THREE.PlaneBufferGeometry(2, 2), null), this.quad.frustumCulled = !1, this.scene.add(this.quad)
  }, THREE.UnrealBloomPass.prototype = Object.assign(Object.create(THREE.Pass.prototype), {
    constructor: THREE.UnrealBloomPass,
    dispose: function () {
      for (var e = 0; e < this.renderTargetsHorizontal.length; e++) this.renderTargetsHorizontal[e].dispose();
      for (e = 0; e < this.renderTargetsVertical.length; e++) this.renderTargetsVertical[e].dispose();
      this.renderTargetBright.dispose()
    },
    setSize: function (e, t) {
      var a = Math.round(e / 2),
        n = Math.round(t / 2);
      this.renderTargetBright.setSize(a, n);
      for (var o = 0; o < this.nMips; o++) this.renderTargetsHorizontal[o].setSize(a, n), this.renderTargetsVertical[o].setSize(a, n), this.separableBlurMaterials[o].uniforms.texSize.value = new THREE.Vector2(a, n), a = Math.round(a / 2), n = Math.round(n / 2)
    },
    render: function (e, t, a, n, o) {
      this.oldClearColor.copy(e.getClearColor()), this.oldClearAlpha = e.getClearAlpha();
      var i = e.autoClear;
      e.autoClear = !1, e.setClearColor(new THREE.Color(0, 0, 0), 0), o && e.context.disable(e.context.STENCIL_TEST), this.renderToScreen && (this.quad.material = this.basic, this.basic.map = a.texture, e.render(this.scene, this.camera, void 0, !0)), this.highPassUniforms.tDiffuse.value = a.texture, this.highPassUniforms.luminosityThreshold.value = this.threshold, this.quad.material = this.materialHighPassFilter, e.render(this.scene, this.camera, this.renderTargetBright, !0);
      for (var r = this.renderTargetBright, s = 0; s < this.nMips; s++) this.quad.material = this.separableBlurMaterials[s], this.separableBlurMaterials[s].uniforms.colorTexture.value = r.texture, this.separableBlurMaterials[s].uniforms.direction.value = THREE.UnrealBloomPass.BlurDirectionX, e.render(this.scene, this.camera, this.renderTargetsHorizontal[s], !0), this.separableBlurMaterials[s].uniforms.colorTexture.value = this.renderTargetsHorizontal[s].texture, this.separableBlurMaterials[s].uniforms.direction.value = THREE.UnrealBloomPass.BlurDirectionY, e.render(this.scene, this.camera, this.renderTargetsVertical[s], !0), r = this.renderTargetsVertical[s];
      this.quad.material = this.compositeMaterial, this.compositeMaterial.uniforms.bloomStrength.value = this.strength, this.compositeMaterial.uniforms.bloomRadius.value = this.radius, this.compositeMaterial.uniforms.bloomTintColors.value = this.bloomTintColors, e.render(this.scene, this.camera, this.renderTargetsHorizontal[0], !0), this.quad.material = this.materialCopy, this.copyUniforms.tDiffuse.value = this.renderTargetsHorizontal[0].texture, o && e.context.enable(e.context.STENCIL_TEST), this.renderToScreen ? e.render(this.scene, this.camera, void 0, !1) : e.render(this.scene, this.camera, a, !1), e.setClearColor(this.oldClearColor, this.oldClearAlpha), e.autoClear = i
    },
    getSeperableBlurMaterial: function (e) {
      return new THREE.ShaderMaterial({
        defines: {
          KERNEL_RADIUS: e,
          SIGMA: e
        },
        uniforms: {
          colorTexture: {
            value: null
          },
          texSize: {
            value: new THREE.Vector2(.5, .5)
          },
          direction: {
            value: new THREE.Vector2(.5, .5)
          }
        },
        vertexShader: "varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",
        fragmentShader: "#include <common>\t\t\t\tvarying vec2 vUv;\n\t\t\t\tuniform sampler2D colorTexture;\n\t\t\t\tuniform vec2 texSize;\t\t\t\tuniform vec2 direction;\t\t\t\t\t\t\t\tfloat gaussianPdf(in float x, in float sigma) {\t\t\t\t\treturn 0.39894 * exp( -0.5 * x * x/( sigma * sigma))/sigma;\t\t\t\t}\t\t\t\tvoid main() {\n\t\t\t\t\tvec2 invSize = 1.0 / texSize;\t\t\t\t\tfloat fSigma = float(SIGMA);\t\t\t\t\tfloat weightSum = gaussianPdf(0.0, fSigma);\t\t\t\t\tvec3 diffuseSum = texture2D( colorTexture, vUv).rgb * weightSum;\t\t\t\t\tfor( int i = 1; i < KERNEL_RADIUS; i ++ ) {\t\t\t\t\t\tfloat x = float(i);\t\t\t\t\t\tfloat w = gaussianPdf(x, fSigma);\t\t\t\t\t\tvec2 uvOffset = direction * invSize * x;\t\t\t\t\t\tvec3 sample1 = texture2D( colorTexture, vUv + uvOffset).rgb;\t\t\t\t\t\tvec3 sample2 = texture2D( colorTexture, vUv - uvOffset).rgb;\t\t\t\t\t\tdiffuseSum += (sample1 + sample2) * w;\t\t\t\t\t\tweightSum += 2.0 * w;\t\t\t\t\t}\t\t\t\t\tgl_FragColor = vec4(diffuseSum/weightSum, 1.0);\n\t\t\t\t}"
      })
    },
    getCompositeMaterial: function (e) {
      return new THREE.ShaderMaterial({
        defines: {
          NUM_MIPS: e
        },
        uniforms: {
          blurTexture1: {
            value: null
          },
          blurTexture2: {
            value: null
          },
          blurTexture3: {
            value: null
          },
          blurTexture4: {
            value: null
          },
          blurTexture5: {
            value: null
          },
          dirtTexture: {
            value: null
          },
          bloomStrength: {
            value: 1
          },
          bloomFactors: {
            value: null
          },
          bloomTintColors: {
            value: null
          },
          bloomRadius: {
            value: 0
          }
        },
        vertexShader: "varying vec2 vUv;\n\t\t\t\tvoid main() {\n\t\t\t\t\tvUv = uv;\n\t\t\t\t\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n\t\t\t\t}",
        fragmentShader: "varying vec2 vUv;\t\t\t\tuniform sampler2D blurTexture1;\t\t\t\tuniform sampler2D blurTexture2;\t\t\t\tuniform sampler2D blurTexture3;\t\t\t\tuniform sampler2D blurTexture4;\t\t\t\tuniform sampler2D blurTexture5;\t\t\t\tuniform sampler2D dirtTexture;\t\t\t\tuniform float bloomStrength;\t\t\t\tuniform float bloomRadius;\t\t\t\tuniform float bloomFactors[NUM_MIPS];\t\t\t\tuniform vec3 bloomTintColors[NUM_MIPS];\t\t\t\t\t\t\t\tfloat lerpBloomFactor(const in float factor) { \t\t\t\t\tfloat mirrorFactor = 1.2 - factor;\t\t\t\t\treturn mix(factor, mirrorFactor, bloomRadius);\t\t\t\t}\t\t\t\t\t\t\t\tvoid main() {\t\t\t\t\tgl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) + \t\t\t\t\t\t\t\t\t\t\t\t\t lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) + \t\t\t\t\t\t\t\t\t\t\t\t\t lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) + \t\t\t\t\t\t\t\t\t\t\t\t\t lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) + \t\t\t\t\t\t\t\t\t\t\t\t\t lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );\t\t\t\t}"
      })
    }
  }), THREE.UnrealBloomPass.BlurDirectionX = new THREE.Vector2(1, 0), THREE.UnrealBloomPass.BlurDirectionY = new THREE.Vector2(0, 1),
  function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.dat = t() : e.dat = t()
  }(this, function () {
    return o = {}, a.m = n = [function (e, t, a) {
      "use strict";
      var n, o = a(1),
        i = (n = o) && n.__esModule ? n : {
          default: n
        };
      e.exports = i.default
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.__esModule = !0;
      var o = n(a(2)),
        i = n(a(6)),
        r = n(a(3)),
        s = n(a(7)),
        l = n(a(8)),
        d = n(a(10)),
        u = n(a(11)),
        c = n(a(12)),
        f = n(a(13)),
        h = n(a(14)),
        p = n(a(15)),
        m = n(a(16)),
        _ = n(a(9)),
        g = n(a(17));
      t.default = {
        color: {
          Color: o.default,
          math: i.default,
          interpret: r.default
        },
        controllers: {
          Controller: s.default,
          BooleanController: l.default,
          OptionController: d.default,
          StringController: u.default,
          NumberController: c.default,
          NumberControllerBox: f.default,
          NumberControllerSlider: h.default,
          FunctionController: p.default,
          ColorController: m.default
        },
        dom: {
          dom: _.default
        },
        gui: {
          GUI: g.default
        },
        GUI: g.default
      }
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }

      function o(e, t, a) {
        Object.defineProperty(e, t, {
          get: function () {
            return "RGB" === this.__state.space || u.recalculateRGB(this, t, a), this.__state[t]
          },
          set: function (e) {
            "RGB" !== this.__state.space && (u.recalculateRGB(this, t, a), this.__state.space = "RGB"), this.__state[t] = e
          }
        })
      }

      function i(e, t) {
        Object.defineProperty(e, t, {
          get: function () {
            return "HSV" === this.__state.space || u.recalculateHSV(this), this.__state[t]
          },
          set: function (e) {
            "HSV" !== this.__state.space && (u.recalculateHSV(this), this.__state.space = "HSV"), this.__state[t] = e
          }
        })
      }
      t.__esModule = !0;
      var r = n(a(3)),
        s = n(a(6)),
        l = n(a(4)),
        d = n(a(5)),
        u = (c.prototype.toString = function () {
          return (0, l.default)(this)
        }, c.prototype.toHexString = function () {
          return (0, l.default)(this, !0)
        }, c.prototype.toOriginal = function () {
          return this.__state.conversion.write(this)
        }, c);

      function c() {
        if (function (e, t) {
            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
          }(this, c), this.__state = r.default.apply(this, arguments), !1 === this.__state) throw new Error("Failed to interpret color arguments");
        this.__state.a = this.__state.a || 1
      }
      u.recalculateRGB = function (e, t, a) {
        if ("HEX" === e.__state.space) e.__state[t] = s.default.component_from_hex(e.__state.hex, a);
        else {
          if ("HSV" !== e.__state.space) throw new Error("Corrupted color state");
          d.default.extend(e.__state, s.default.hsv_to_rgb(e.__state.h, e.__state.s, e.__state.v))
        }
      }, u.recalculateHSV = function (e) {
        var t = s.default.rgb_to_hsv(e.r, e.g, e.b);
        d.default.extend(e.__state, {
          s: t.s,
          v: t.v
        }), d.default.isNaN(t.h) ? d.default.isUndefined(e.__state.h) && (e.__state.h = 0) : e.__state.h = t.h
      }, u.COMPONENTS = ["r", "g", "b", "h", "s", "v", "hex", "a"], o(u.prototype, "r", 2), o(u.prototype, "g", 1), o(u.prototype, "b", 0), i(u.prototype, "h"), i(u.prototype, "s"), i(u.prototype, "v"), Object.defineProperty(u.prototype, "a", {
        get: function () {
          return this.__state.a
        },
        set: function (e) {
          this.__state.a = e
        }
      }), Object.defineProperty(u.prototype, "hex", {
        get: function () {
          return "HEX" !== !this.__state.space && (this.__state.hex = s.default.rgb_to_hex(this.r, this.g, this.b)), this.__state.hex
        },
        set: function (e) {
          this.__state.space = "HEX", this.__state.hex = e
        }
      }), t.default = u
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.__esModule = !0;
      var o = n(a(4)),
        i = n(a(5)),
        r = [{
          litmus: i.default.isString,
          conversions: {
            THREE_CHAR_HEX: {
              read: function (e) {
                var t = e.match(/^#([A-F0-9])([A-F0-9])([A-F0-9])$/i);
                return null !== t && {
                  space: "HEX",
                  hex: parseInt("0x" + t[1].toString() + t[1].toString() + t[2].toString() + t[2].toString() + t[3].toString() + t[3].toString(), 0)
                }
              },
              write: o.default
            },
            SIX_CHAR_HEX: {
              read: function (e) {
                var t = e.match(/^#([A-F0-9]{6})$/i);
                return null !== t && {
                  space: "HEX",
                  hex: parseInt("0x" + t[1].toString(), 0)
                }
              },
              write: o.default
            },
            CSS_RGB: {
              read: function (e) {
                var t = e.match(/^rgb\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                return null !== t && {
                  space: "RGB",
                  r: parseFloat(t[1]),
                  g: parseFloat(t[2]),
                  b: parseFloat(t[3])
                }
              },
              write: o.default
            },
            CSS_RGBA: {
              read: function (e) {
                var t = e.match(/^rgba\(\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*,\s*(.+)\s*\)/);
                return null !== t && {
                  space: "RGB",
                  r: parseFloat(t[1]),
                  g: parseFloat(t[2]),
                  b: parseFloat(t[3]),
                  a: parseFloat(t[4])
                }
              },
              write: o.default
            }
          }
        }, {
          litmus: i.default.isNumber,
          conversions: {
            HEX: {
              read: function (e) {
                return {
                  space: "HEX",
                  hex: e,
                  conversionName: "HEX"
                }
              },
              write: function (e) {
                return e.hex
              }
            }
          }
        }, {
          litmus: i.default.isArray,
          conversions: {
            RGB_ARRAY: {
              read: function (e) {
                return 3 === e.length && {
                  space: "RGB",
                  r: e[0],
                  g: e[1],
                  b: e[2]
                }
              },
              write: function (e) {
                return [e.r, e.g, e.b]
              }
            },
            RGBA_ARRAY: {
              read: function (e) {
                return 4 === e.length && {
                  space: "RGB",
                  r: e[0],
                  g: e[1],
                  b: e[2],
                  a: e[3]
                }
              },
              write: function (e) {
                return [e.r, e.g, e.b, e.a]
              }
            }
          }
        }, {
          litmus: i.default.isObject,
          conversions: {
            RGBA_OBJ: {
              read: function (e) {
                return !!(i.default.isNumber(e.r) && i.default.isNumber(e.g) && i.default.isNumber(e.b) && i.default.isNumber(e.a)) && {
                  space: "RGB",
                  r: e.r,
                  g: e.g,
                  b: e.b,
                  a: e.a
                }
              },
              write: function (e) {
                return {
                  r: e.r,
                  g: e.g,
                  b: e.b,
                  a: e.a
                }
              }
            },
            RGB_OBJ: {
              read: function (e) {
                return !!(i.default.isNumber(e.r) && i.default.isNumber(e.g) && i.default.isNumber(e.b)) && {
                  space: "RGB",
                  r: e.r,
                  g: e.g,
                  b: e.b
                }
              },
              write: function (e) {
                return {
                  r: e.r,
                  g: e.g,
                  b: e.b
                }
              }
            },
            HSVA_OBJ: {
              read: function (e) {
                return !!(i.default.isNumber(e.h) && i.default.isNumber(e.s) && i.default.isNumber(e.v) && i.default.isNumber(e.a)) && {
                  space: "HSV",
                  h: e.h,
                  s: e.s,
                  v: e.v,
                  a: e.a
                }
              },
              write: function (e) {
                return {
                  h: e.h,
                  s: e.s,
                  v: e.v,
                  a: e.a
                }
              }
            },
            HSV_OBJ: {
              read: function (e) {
                return !!(i.default.isNumber(e.h) && i.default.isNumber(e.s) && i.default.isNumber(e.v)) && {
                  space: "HSV",
                  h: e.h,
                  s: e.s,
                  v: e.v
                }
              },
              write: function (e) {
                return {
                  h: e.h,
                  s: e.s,
                  v: e.v
                }
              }
            }
          }
        }],
        s = void 0,
        l = void 0;
      t.default = function () {
        l = !1;
        var a = 1 < arguments.length ? i.default.toArray(arguments) : arguments[0];
        return i.default.each(r, function (e) {
          if (e.litmus(a)) return i.default.each(e.conversions, function (e, t) {
            if (s = e.read(a), !1 === l && !1 !== s) return (l = s).conversionName = t, s.conversion = e, i.default.BREAK
          }), i.default.BREAK
        }), l
      }
    }, function (e, t) {
      "use strict";
      t.__esModule = !0, t.default = function (e, t) {
        var a = e.__state.conversionName.toString(),
          n = Math.round(e.r),
          o = Math.round(e.g),
          i = Math.round(e.b),
          r = e.a,
          s = Math.round(e.h),
          l = e.s.toFixed(1),
          d = e.v.toFixed(1);
        if (t || "THREE_CHAR_HEX" === a || "SIX_CHAR_HEX" === a) {
          for (var u = e.hex.toString(16); u.length < 6;) u = "0" + u;
          return "#" + u
        }
        return "CSS_RGB" === a ? "rgb(" + n + "," + o + "," + i + ")" : "CSS_RGBA" === a ? "rgba(" + n + "," + o + "," + i + "," + r + ")" : "HEX" === a ? "0x" + e.hex.toString(16) : "RGB_ARRAY" === a ? "[" + n + "," + o + "," + i + "]" : "RGBA_ARRAY" === a ? "[" + n + "," + o + "," + i + "," + r + "]" : "RGB_OBJ" === a ? "{r:" + n + ",g:" + o + ",b:" + i + "}" : "RGBA_OBJ" === a ? "{r:" + n + ",g:" + o + ",b:" + i + ",a:" + r + "}" : "HSV_OBJ" === a ? "{h:" + s + ",s:" + l + ",v:" + d + "}" : "HSVA_OBJ" === a ? "{h:" + s + ",s:" + l + ",v:" + d + ",a:" + r + "}" : "unknown format"
      }
    }, function (e, t) {
      "use strict";
      t.__esModule = !0;
      var a, r = Array.prototype.forEach,
        n = Array.prototype.slice,
        o = {
          BREAK: {},
          extend: function (a) {
            return this.each(n.call(arguments, 1), function (t) {
              (this.isObject(t) ? Object.keys(t) : []).forEach(function (e) {
                this.isUndefined(t[e]) || (a[e] = t[e])
              }.bind(this))
            }, this), a
          },
          defaults: function (a) {
            return this.each(n.call(arguments, 1), function (t) {
              (this.isObject(t) ? Object.keys(t) : []).forEach(function (e) {
                this.isUndefined(a[e]) && (a[e] = t[e])
              }.bind(this))
            }, this), a
          },
          compose: function () {
            var a = n.call(arguments);
            return function () {
              for (var e = n.call(arguments), t = a.length - 1; 0 <= t; t--) e = [a[t].apply(this, e)];
              return e[0]
            }
          },
          each: function (e, t, a) {
            if (e)
              if (r && e.forEach && e.forEach === r) e.forEach(t, a);
              else if (e.length === e.length + 0) {
              var n, o = void 0;
              for (o = 0, n = e.length; o < n; o++)
                if (o in e && t.call(a, e[o], o) === this.BREAK) return
            } else
              for (var i in e)
                if (t.call(a, e[i], i) === this.BREAK) return
          },
          defer: function (e) {
            setTimeout(e, 0)
          },
          debounce: function (a, n) {
            var o = void 0;
            return function () {
              var e = arguments,
                t = !o;
              clearTimeout(o), o = setTimeout(function () {
                o = null
              }, n), t && a.apply(this, e)
            }
          },
          toArray: function (e) {
            return e.toArray ? e.toArray() : n.call(e)
          },
          isUndefined: function (e) {
            return void 0 === e
          },
          isNull: function (e) {
            return null === e
          },
          isNaN: (a = function (e) {
            return isNaN(e)
          }, i.toString = function () {
            return a.toString()
          }, i),
          isArray: Array.isArray || function (e) {
            return e.constructor === Array
          },
          isObject: function (e) {
            return e === Object(e)
          },
          isNumber: function (e) {
            return e === e + 0
          },
          isString: function (e) {
            return e === e + ""
          },
          isBoolean: function (e) {
            return !1 === e || !0 === e
          },
          isFunction: function (e) {
            return "[object Function]" === Object.prototype.toString.call(e)
          }
        };

      function i(e) {
        return a.apply(this, arguments)
      }
      t.default = o
    }, function (e, t) {
      "use strict";
      t.__esModule = !0;
      var n = void 0,
        a = {
          hsv_to_rgb: function (e, t, a) {
            var n = Math.floor(e / 60) % 6,
              o = e / 60 - Math.floor(e / 60),
              i = a * (1 - t),
              r = a * (1 - o * t),
              s = a * (1 - (1 - o) * t),
              l = [
                [a, s, i],
                [r, a, i],
                [i, a, s],
                [i, r, a],
                [s, i, a],
                [a, i, r]
              ][n];
            return {
              r: 255 * l[0],
              g: 255 * l[1],
              b: 255 * l[2]
            }
          },
          rgb_to_hsv: function (e, t, a) {
            var n = Math.min(e, t, a),
              o = Math.max(e, t, a),
              i = o - n,
              r = void 0;
            return 0 === o ? {
              h: NaN,
              s: 0,
              v: 0
            } : (r = e === o ? (t - a) / i : t === o ? 2 + (a - e) / i : 4 + (e - t) / i, (r /= 6) < 0 && (r += 1), {
              h: 360 * r,
              s: i / o,
              v: o / 255
            })
          },
          rgb_to_hex: function (e, t, a) {
            var n = this.hex_with_component(0, 2, e);
            return n = this.hex_with_component(n, 1, t), this.hex_with_component(n, 0, a)
          },
          component_from_hex: function (e, t) {
            return e >> 8 * t & 255
          },
          hex_with_component: function (e, t, a) {
            return a << (n = 8 * t) | e & ~(255 << n)
          }
        };
      t.default = a
    }, function (e, t) {
      "use strict";
      t.__esModule = !0;
      var a = (n.prototype.onChange = function (e) {
        return this.__onChange = e, this
      }, n.prototype.onFinishChange = function (e) {
        return this.__onFinishChange = e, this
      }, n.prototype.setValue = function (e) {
        return this.object[this.property] = e, this.__onChange && this.__onChange.call(this, e), this.updateDisplay(), this
      }, n.prototype.getValue = function () {
        return this.object[this.property]
      }, n.prototype.updateDisplay = function () {
        return this
      }, n.prototype.isModified = function () {
        return this.initialValue !== this.getValue()
      }, n);

      function n(e, t) {
        (function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        })(this, n), this.initialValue = e[t], this.domElement = document.createElement("div"), this.object = e, this.property = t, this.__onChange = void 0, this.__onFinishChange = void 0
      }
      t.default = a
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.__esModule = !0;
      var o, i = n(a(7)),
        r = n(a(9)),
        s = (function (e, t) {
          if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
          e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(l, o = i.default), l.prototype.setValue = function (e) {
          var t = o.prototype.setValue.call(this, e);
          return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), this.__prev = this.getValue(), t
        }, l.prototype.updateDisplay = function () {
          return !0 === this.getValue() ? (this.__checkbox.setAttribute("checked", "checked"), this.__checkbox.checked = !0) : this.__checkbox.checked = !1, o.prototype.updateDisplay.call(this)
        }, l);

      function l(e, t) {
        ! function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, l);
        var a = function (e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
          }(this, o.call(this, e, t)),
          n = a;
        return a.__prev = a.getValue(), a.__checkbox = document.createElement("input"), a.__checkbox.setAttribute("type", "checkbox"), r.default.bind(a.__checkbox, "change", function () {
          n.setValue(!n.__prev)
        }, !1), a.domElement.appendChild(a.__checkbox), a.updateDisplay(), a
      }
      t.default = s
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        if ("0" === e || u.default.isUndefined(e)) return 0;
        var t = e.match(r);
        return u.default.isNull(t) ? 0 : parseFloat(t[1])
      }
      t.__esModule = !0;
      var o, i = a(5),
        u = (o = i) && o.__esModule ? o : {
          default: o
        },
        c = {};
      u.default.each({
        HTMLEvents: ["change"],
        MouseEvents: ["click", "mousemove", "mousedown", "mouseup", "mouseover"],
        KeyboardEvents: ["keydown"]
      }, function (e, t) {
        u.default.each(e, function (e) {
          c[e] = t
        })
      });
      var r = /(\d+(\.\d+)?)px/,
        s = {
          makeSelectable: function (e, t) {
            void 0 !== e && void 0 !== e.style && (e.onselectstart = t ? function () {
              return !1
            } : function () {}, e.style.MozUserSelect = t ? "auto" : "none", e.style.KhtmlUserSelect = t ? "auto" : "none", e.unselectable = t ? "on" : "off")
          },
          makeFullscreen: function (e, t, a) {
            var n = a,
              o = t;
            u.default.isUndefined(o) && (o = !0), u.default.isUndefined(n) && (n = !0), e.style.position = "absolute", o && (e.style.left = 0, e.style.right = 0), n && (e.style.top = 0, e.style.bottom = 0)
          },
          fakeEvent: function (e, t, a, n) {
            var o = a || {},
              i = c[t];
            if (!i) throw new Error("Event type " + t + " not supported.");
            var r = document.createEvent(i);
            switch (i) {
              case "MouseEvents":
                var s = o.x || o.clientX || 0,
                  l = o.y || o.clientY || 0;
                r.initMouseEvent(t, o.bubbles || !1, o.cancelable || !0, window, o.clickCount || 1, 0, 0, s, l, !1, !1, !1, !1, 0, null);
                break;
              case "KeyboardEvents":
                var d = r.initKeyboardEvent || r.initKeyEvent;
                u.default.defaults(o, {
                  cancelable: !0,
                  ctrlKey: !1,
                  altKey: !1,
                  shiftKey: !1,
                  metaKey: !1,
                  keyCode: void 0,
                  charCode: void 0
                }), d(t, o.bubbles || !1, o.cancelable, window, o.ctrlKey, o.altKey, o.shiftKey, o.metaKey, o.keyCode, o.charCode);
                break;
              default:
                r.initEvent(t, o.bubbles || !1, o.cancelable || !0)
            }
            u.default.defaults(r, n), e.dispatchEvent(r)
          },
          bind: function (e, t, a, n) {
            var o = n || !1;
            return e.addEventListener ? e.addEventListener(t, a, o) : e.attachEvent && e.attachEvent("on" + t, a), s
          },
          unbind: function (e, t, a, n) {
            var o = n || !1;
            return e.removeEventListener ? e.removeEventListener(t, a, o) : e.detachEvent && e.detachEvent("on" + t, a), s
          },
          addClass: function (e, t) {
            if (void 0 === e.className) e.className = t;
            else if (e.className !== t) {
              var a = e.className.split(/ +/); - 1 === a.indexOf(t) && (a.push(t), e.className = a.join(" ").replace(/^\s+/, "").replace(/\s+$/, ""))
            }
            return s
          },
          removeClass: function (e, t) {
            if (t)
              if (e.className === t) e.removeAttribute("class");
              else {
                var a = e.className.split(/ +/),
                  n = a.indexOf(t); - 1 !== n && (a.splice(n, 1), e.className = a.join(" "))
              }
            else e.className = void 0;
            return s
          },
          hasClass: function (e, t) {
            return new RegExp("(?:^|\\s+)" + t + "(?:\\s+|$)").test(e.className) || !1
          },
          getWidth: function (e) {
            var t = getComputedStyle(e);
            return n(t["border-left-width"]) + n(t["border-right-width"]) + n(t["padding-left"]) + n(t["padding-right"]) + n(t.width)
          },
          getHeight: function (e) {
            var t = getComputedStyle(e);
            return n(t["border-top-width"]) + n(t["border-bottom-width"]) + n(t["padding-top"]) + n(t["padding-bottom"]) + n(t.height)
          },
          getOffset: function (e) {
            var t = e,
              a = {
                left: 0,
                top: 0
              };
            if (t.offsetParent)
              for (; a.left += t.offsetLeft, a.top += t.offsetTop, t = t.offsetParent;);
            return a
          },
          isActive: function (e) {
            return e === document.activeElement && (e.type || e.href)
          }
        };
      t.default = s
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.__esModule = !0;
      var s, o = n(a(7)),
        l = n(a(9)),
        d = n(a(5)),
        i = (function (e, t) {
          if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
          e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(u, s = o.default), u.prototype.setValue = function (e) {
          var t = s.prototype.setValue.call(this, e);
          return this.__onFinishChange && this.__onFinishChange.call(this, this.getValue()), t
        }, u.prototype.updateDisplay = function () {
          return l.default.isActive(this.__select) ? this : (this.__select.value = this.getValue(), s.prototype.updateDisplay.call(this))
        }, u);

      function u(e, t, a) {
        ! function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, u);
        var n, o = function (e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
          }(this, s.call(this, e, t)),
          i = a,
          r = o;
        return o.__select = document.createElement("select"), d.default.isArray(i) && (n = {}, d.default.each(i, function (e) {
          n[e] = e
        }), i = n), d.default.each(i, function (e, t) {
          var a = document.createElement("option");
          a.innerHTML = t, a.setAttribute("value", e), r.__select.appendChild(a)
        }), o.updateDisplay(), l.default.bind(o.__select, "change", function () {
          var e = this.options[this.selectedIndex].value;
          r.setValue(e)
        }), o.domElement.appendChild(o.__select), o
      }
      t.default = i
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.__esModule = !0;
      var i, o = n(a(7)),
        r = n(a(9)),
        s = (function (e, t) {
          if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
          e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(l, i = o.default), l.prototype.updateDisplay = function () {
          return r.default.isActive(this.__input) || (this.__input.value = this.getValue()), i.prototype.updateDisplay.call(this)
        }, l);

      function l(e, t) {
        function a() {
          o.setValue(o.__input.value)
        }! function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, l);
        var n = function (e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
          }(this, i.call(this, e, t)),
          o = n;
        return n.__input = document.createElement("input"), n.__input.setAttribute("type", "text"), r.default.bind(n.__input, "keyup", a), r.default.bind(n.__input, "change", a), r.default.bind(n.__input, "blur", function () {
          o.__onFinishChange && o.__onFinishChange.call(o, o.getValue())
        }), r.default.bind(n.__input, "keydown", function (e) {
          13 === e.keyCode && this.blur()
        }), n.updateDisplay(), n.domElement.appendChild(n.__input), n
      }
      t.default = s
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }

      function i(e) {
        var t = e.toString();
        return -1 < t.indexOf(".") ? t.length - t.indexOf(".") - 1 : 0
      }
      t.__esModule = !0;
      var r, o = n(a(7)),
        s = n(a(5)),
        l = (function (e, t) {
          if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
          e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(d, r = o.default), d.prototype.setValue = function (e) {
          var t = e;
          return void 0 !== this.__min && t < this.__min ? t = this.__min : void 0 !== this.__max && t > this.__max && (t = this.__max), void 0 !== this.__step && t % this.__step != 0 && (t = Math.round(t / this.__step) * this.__step), r.prototype.setValue.call(this, t)
        }, d.prototype.min = function (e) {
          return this.__min = e, this
        }, d.prototype.max = function (e) {
          return this.__max = e, this
        }, d.prototype.step = function (e) {
          return this.__step = e, this.__impliedStep = e, this.__precision = i(e), this
        }, d);

      function d(e, t, a) {
        ! function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, d);
        var n = function (e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
          }(this, r.call(this, e, t)),
          o = a || {};
        return n.__min = o.min, n.__max = o.max, n.__step = o.step, s.default.isUndefined(n.__step) ? 0 === n.initialValue ? n.__impliedStep = 1 : n.__impliedStep = Math.pow(10, Math.floor(Math.log(Math.abs(n.initialValue)) / Math.LN10)) / 10 : n.__impliedStep = n.__step, n.__precision = i(n.__impliedStep), n
      }
      t.default = l
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.__esModule = !0;
      var d, o = n(a(12)),
        u = n(a(9)),
        c = n(a(5)),
        i = (function (e, t) {
          if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
          e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(f, d = o.default), f.prototype.updateDisplay = function () {
          return this.__input.value = this.__truncationSuspended ? this.getValue() : (e = this.getValue(), t = this.__precision, a = Math.pow(10, t), Math.round(e * a) / a), d.prototype.updateDisplay.call(this);
          var e, t, a
        }, f);

      function f(e, t, a) {
        function n() {
          s.__onFinishChange && s.__onFinishChange.call(s, s.getValue())
        }

        function o(e) {
          var t = l - e.clientY;
          s.setValue(s.getValue() + t * s.__impliedStep), l = e.clientY
        }

        function i() {
          u.default.unbind(window, "mousemove", o), u.default.unbind(window, "mouseup", i), n()
        }! function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, f);
        var r = function (e, t) {
          if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || "object" != typeof t && "function" != typeof t ? e : t
        }(this, d.call(this, e, t, a));
        r.__truncationSuspended = !1;
        var s = r,
          l = void 0;
        return r.__input = document.createElement("input"), r.__input.setAttribute("type", "text"), u.default.bind(r.__input, "change", function () {
          var e = parseFloat(s.__input.value);
          c.default.isNaN(e) || s.setValue(e)
        }), u.default.bind(r.__input, "blur", function () {
          n()
        }), u.default.bind(r.__input, "mousedown", function (e) {
          u.default.bind(window, "mousemove", o), u.default.bind(window, "mouseup", i), l = e.clientY
        }), u.default.bind(r.__input, "keydown", function (e) {
          13 === e.keyCode && (s.__truncationSuspended = !0, this.blur(), s.__truncationSuspended = !1, n())
        }), r.updateDisplay(), r.domElement.appendChild(r.__input), r
      }
      t.default = i
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.__esModule = !0;
      var d, o = n(a(12)),
        u = n(a(9)),
        i = (function (e, t) {
          if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
          e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(c, d = o.default), c.prototype.updateDisplay = function () {
          var e = (this.getValue() - this.__min) / (this.__max - this.__min);
          return this.__foreground.style.width = 100 * e + "%", d.prototype.updateDisplay.call(this)
        }, c);

      function c(e, t, a, n, o) {
        function i(e) {
          e.preventDefault();
          var t, a, n, o, i, r = l.__background.getBoundingClientRect();
          return l.setValue((t = e.clientX, a = r.left, n = r.right, o = l.__min, i = l.__max, o + (t - a) / (n - a) * (i - o))), !1
        }

        function r() {
          u.default.unbind(window, "mousemove", i), u.default.unbind(window, "mouseup", r), l.__onFinishChange && l.__onFinishChange.call(l, l.getValue())
        }! function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, c);
        var s = function (e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
          }(this, d.call(this, e, t, {
            min: a,
            max: n,
            step: o
          })),
          l = s;
        return s.__background = document.createElement("div"), s.__foreground = document.createElement("div"), u.default.bind(s.__background, "mousedown", function (e) {
          document.activeElement.blur(), u.default.bind(window, "mousemove", i), u.default.bind(window, "mouseup", r), i(e)
        }), u.default.addClass(s.__background, "slider"), u.default.addClass(s.__foreground, "slider-fg"), s.updateDisplay(), s.__background.appendChild(s.__foreground), s.domElement.appendChild(s.__background), s
      }
      t.default = i
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.__esModule = !0;
      var i, o = n(a(7)),
        r = n(a(9)),
        s = (function (e, t) {
          if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
          e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(l, i = o.default), l.prototype.fire = function () {
          this.__onChange && this.__onChange.call(this), this.getValue().call(this.object), this.__onFinishChange && this.__onFinishChange.call(this, this.getValue())
        }, l);

      function l(e, t, a) {
        ! function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, l);
        var n = function (e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !t || "object" != typeof t && "function" != typeof t ? e : t
          }(this, i.call(this, e, t)),
          o = n;
        return n.__button = document.createElement("div"), n.__button.innerHTML = void 0 === a ? "Fire" : a, r.default.bind(n.__button, "click", function (e) {
          return e.preventDefault(), o.fire(), !1
        }), r.default.addClass(n.__button, "button"), n.domElement.appendChild(n.__button), n
      }
      t.default = s
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }

      function h(t, a, n, o) {
        t.style.background = "", A.default.each(r, function (e) {
          t.style.cssText += "background: " + e + "linear-gradient(" + a + ", " + n + " 0%, " + o + " 100%); "
        })
      }
      t.__esModule = !0;
      var p, o = n(a(7)),
        m = n(a(9)),
        _ = n(a(2)),
        g = n(a(3)),
        A = n(a(5)),
        i = (function (e, t) {
          if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
          e.prototype = Object.create(t && t.prototype, {
            constructor: {
              value: e,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }(v, p = o.default), v.prototype.updateDisplay = function () {
          var t = (0, g.default)(this.getValue());
          if (!1 !== t) {
            var a = !1;
            A.default.each(_.default.COMPONENTS, function (e) {
              if (!A.default.isUndefined(t[e]) && !A.default.isUndefined(this.__color.__state[e]) && t[e] !== this.__color.__state[e]) return a = !0, {}
            }, this), a && A.default.extend(this.__color.__state, t)
          }
          A.default.extend(this.__temp.__state, this.__color.__state), this.__temp.a = 1;
          var e = this.__color.v < .5 || .5 < this.__color.s ? 255 : 0,
            n = 255 - e;
          A.default.extend(this.__field_knob.style, {
            marginLeft: 100 * this.__color.s - 7 + "px",
            marginTop: 100 * (1 - this.__color.v) - 7 + "px",
            backgroundColor: this.__temp.toHexString(),
            border: this.__field_knob_border + "rgb(" + e + "," + e + "," + e + ")"
          }), this.__hue_knob.style.marginTop = 100 * (1 - this.__color.h / 360) + "px", this.__temp.s = 1, this.__temp.v = 1, h(this.__saturation_field, "left", "#fff", this.__temp.toHexString()), this.__input.value = this.__color.toString(), A.default.extend(this.__input.style, {
            backgroundColor: this.__color.toHexString(),
            color: "rgb(" + e + "," + e + "," + e + ")",
            textShadow: this.__input_textShadow + "rgba(" + n + "," + n + "," + n + ",.7)"
          })
        }, v),
        r = ["-moz-", "-o-", "-webkit-", "-ms-", ""];

      function v(e, t) {
        function a(e) {
          s(e), m.default.bind(window, "mousemove", s), m.default.bind(window, "mouseup", n)
        }

        function n() {
          m.default.unbind(window, "mousemove", s), m.default.unbind(window, "mouseup", n), r()
        }

        function o() {
          var e = (0, g.default)(this.value);
          !1 !== e ? (u.__color.__state = e, u.setValue(u.__color.toOriginal())) : this.value = u.__color.toString()
        }

        function i() {
          m.default.unbind(window, "mousemove", l), m.default.unbind(window, "mouseup", i), r()
        }

        function r() {
          u.__onFinishChange && u.__onFinishChange.call(u, u.__color.toOriginal())
        }

        function s(e) {
          e.preventDefault();
          var t = u.__saturation_field.getBoundingClientRect(),
            a = (e.clientX - t.left) / (t.right - t.left),
            n = 1 - (e.clientY - t.top) / (t.bottom - t.top);
          return 1 < n ? n = 1 : n < 0 && (n = 0), 1 < a ? a = 1 : a < 0 && (a = 0), u.__color.v = n, u.__color.s = a, u.setValue(u.__color.toOriginal()), !1
        }

        function l(e) {
          e.preventDefault();
          var t = u.__hue_field.getBoundingClientRect(),
            a = 1 - (e.clientY - t.top) / (t.bottom - t.top);
          return 1 < a ? a = 1 : a < 0 && (a = 0), u.__color.h = 360 * a, u.setValue(u.__color.toOriginal()), !1
        }! function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }(this, v);
        var d = function (e, t) {
          if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
          return !t || "object" != typeof t && "function" != typeof t ? e : t
        }(this, p.call(this, e, t));
        d.__color = new _.default(d.getValue()), d.__temp = new _.default(0);
        var u = d;
        d.domElement = document.createElement("div"), m.default.makeSelectable(d.domElement, !1), d.__selector = document.createElement("div"), d.__selector.className = "selector", d.__saturation_field = document.createElement("div"), d.__saturation_field.className = "saturation-field", d.__field_knob = document.createElement("div"), d.__field_knob.className = "field-knob", d.__field_knob_border = "2px solid ", d.__hue_knob = document.createElement("div"), d.__hue_knob.className = "hue-knob", d.__hue_field = document.createElement("div"), d.__hue_field.className = "hue-field", d.__input = document.createElement("input"), d.__input.type = "text", d.__input_textShadow = "0 1px 1px ", m.default.bind(d.__input, "keydown", function (e) {
          13 === e.keyCode && o.call(this)
        }), m.default.bind(d.__input, "blur", o), m.default.bind(d.__selector, "mousedown", function () {
          m.default.addClass(this, "drag").bind(window, "mouseup", function () {
            m.default.removeClass(u.__selector, "drag")
          })
        });
        var c, f = document.createElement("div");
        return A.default.extend(d.__selector.style, {
          width: "122px",
          height: "102px",
          padding: "3px",
          backgroundColor: "#222",
          boxShadow: "0px 1px 3px rgba(0,0,0,0.3)"
        }), A.default.extend(d.__field_knob.style, {
          position: "absolute",
          width: "12px",
          height: "12px",
          border: d.__field_knob_border + (d.__color.v < .5 ? "#fff" : "#000"),
          boxShadow: "0px 1px 3px rgba(0,0,0,0.5)",
          borderRadius: "12px",
          zIndex: 1
        }), A.default.extend(d.__hue_knob.style, {
          position: "absolute",
          width: "15px",
          height: "2px",
          borderRight: "4px solid #fff",
          zIndex: 1
        }), A.default.extend(d.__saturation_field.style, {
          width: "100px",
          height: "100px",
          border: "1px solid #555",
          marginRight: "3px",
          display: "inline-block",
          cursor: "pointer"
        }), A.default.extend(f.style, {
          width: "100%",
          height: "100%",
          background: "none"
        }), h(f, "top", "rgba(0,0,0,0)", "#000"), A.default.extend(d.__hue_field.style, {
          width: "15px",
          height: "100px",
          border: "1px solid #555",
          cursor: "ns-resize",
          position: "absolute",
          top: "3px",
          right: "3px"
        }), (c = d.__hue_field).style.background = "", c.style.cssText += "background: -moz-linear-gradient(top,  #ff0000 0%, #ff00ff 17%, #0000ff 34%, #00ffff 50%, #00ff00 67%, #ffff00 84%, #ff0000 100%);", c.style.cssText += "background: -webkit-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", c.style.cssText += "background: -o-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", c.style.cssText += "background: -ms-linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", c.style.cssText += "background: linear-gradient(top,  #ff0000 0%,#ff00ff 17%,#0000ff 34%,#00ffff 50%,#00ff00 67%,#ffff00 84%,#ff0000 100%);", A.default.extend(d.__input.style, {
          outline: "none",
          textAlign: "center",
          color: "#fff",
          border: 0,
          fontWeight: "bold",
          textShadow: d.__input_textShadow + "rgba(0,0,0,0.7)"
        }), m.default.bind(d.__saturation_field, "mousedown", a), m.default.bind(d.__field_knob, "mousedown", a), m.default.bind(d.__hue_field, "mousedown", function (e) {
          l(e), m.default.bind(window, "mousemove", l), m.default.bind(window, "mouseup", i)
        }), d.__saturation_field.appendChild(f), d.__selector.appendChild(d.__field_knob), d.__selector.appendChild(d.__saturation_field), d.__selector.appendChild(d.__hue_field), d.__hue_field.appendChild(d.__hue_knob), d.domElement.appendChild(d.__input), d.domElement.appendChild(d.__selector), d.updateDisplay(), d
      }
      t.default = i
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }

      function m(e, t, a) {
        var n = document.createElement("li");
        return t && n.appendChild(t), a ? e.__ul.insertBefore(n, a) : e.__ul.appendChild(n), e.onResize(), n
      }

      function d(e, t) {
        var a = e.__preset_select[e.__preset_select.selectedIndex];
        a.innerHTML = t ? a.value + "*" : a.value
      }

      function u(e, t) {
        var a = e.getRoot(),
          n = a.__rememberedObjects.indexOf(t.object);
        if (-1 !== n) {
          var o = a.__rememberedObjectIndecesToControllers[n];
          if (void 0 === o && (o = {}, a.__rememberedObjectIndecesToControllers[n] = o), o[t.property] = t, a.load && a.load.remembered) {
            var i = a.load.remembered,
              r = void 0;
            if (i[e.preset]) r = i[e.preset];
            else {
              if (!i[N]) return;
              r = i[N]
            }
            if (r[n] && void 0 !== r[n][t.property]) {
              var s = r[n][t.property];
              t.initialValue = s, t.setValue(s)
            }
          }
        }
      }

      function c(e, t, a, n) {
        if (void 0 === t[a]) throw new Error('Object "' + t + '" has no property "' + a + '"');
        var o = void 0;
        if (n.color) o = new y.default(t, a);
        else {
          var i = [t, a].concat(n.factoryArgs);
          o = A.default.apply(e, i)
        }
        n.before instanceof v.default && (n.before = n.before.__li), u(e, o), F.default.addClass(o.domElement, "c");
        var r = document.createElement("span");
        F.default.addClass(r, "property-name"), r.innerHTML = o.property;
        var s = document.createElement("div");
        s.appendChild(r), s.appendChild(o.domElement);
        var l = m(e, s, n.before);
        return F.default.addClass(l, U.CLASS_CONTROLLER_ROW), o instanceof y.default ? F.default.addClass(l, "color") : F.default.addClass(l, p(o.getValue())),
          function (o, t, i) {
            if (i.__li = t, i.__gui = o, P.default.extend(i, {
                options: function (e) {
                  if (1 < arguments.length) {
                    var t = i.__li.nextElementSibling;
                    return i.remove(), c(o, i.object, i.property, {
                      before: t,
                      factoryArgs: [P.default.toArray(arguments)]
                    })
                  }
                  if (P.default.isArray(e) || P.default.isObject(e)) {
                    var a = i.__li.nextElementSibling;
                    return i.remove(), c(o, i.object, i.property, {
                      before: a,
                      factoryArgs: [e]
                    })
                  }
                },
                name: function (e) {
                  return i.__li.firstElementChild.firstElementChild.innerHTML = e, i
                },
                listen: function () {
                  return i.__gui.listen(i), i
                },
                remove: function () {
                  return i.__gui.remove(i), i
                }
              }), i instanceof T.default) n = new E.default(i.object, i.property, {
              min: i.__min,
              max: i.__max,
              step: i.__step
            }), P.default.each(["updateDisplay", "onChange", "onFinishChange", "step"], function (e) {
              var t = i[e],
                a = n[e];
              i[e] = n[e] = function () {
                var e = Array.prototype.slice.call(arguments);
                return a.apply(n, e), t.apply(i, e)
              }
            }), F.default.addClass(t, "has-slider"), i.domElement.insertBefore(n.domElement, i.domElement.firstElementChild);
            else if (i instanceof E.default) {
              var e = function (e) {
                if (P.default.isNumber(i.__min) && P.default.isNumber(i.__max)) {
                  var t = i.__li.firstElementChild.firstElementChild.innerHTML,
                    a = -1 < i.__gui.__listening.indexOf(i);
                  i.remove();
                  var n = c(o, i.object, i.property, {
                    before: i.__li.nextElementSibling,
                    factoryArgs: [i.__min, i.__max, i.__step]
                  });
                  return n.name(t), a && n.listen(), n
                }
                return e
              };
              i.min = P.default.compose(e, i.min), i.max = P.default.compose(e, i.max)
            } else i instanceof x.default ? (F.default.bind(t, "click", function () {
              F.default.fakeEvent(i.__checkbox, "click")
            }), F.default.bind(i.__checkbox, "click", function (e) {
              e.stopPropagation()
            })) : i instanceof b.default ? (F.default.bind(t, "click", function () {
              F.default.fakeEvent(i.__button, "click")
            }), F.default.bind(t, "mouseover", function () {
              F.default.addClass(i.__button, "hover")
            }), F.default.bind(t, "mouseout", function () {
              F.default.removeClass(i.__button, "hover")
            })) : i instanceof y.default && (F.default.addClass(t, "color"), i.updateDisplay = P.default.compose(function (e) {
              return t.style.borderLeftColor = i.__color.toString(), e
            }, i.updateDisplay), i.updateDisplay());
            var n;
            i.setValue = P.default.compose(function (e) {
              return o.getRoot().__preset_select && i.isModified() && d(o.getRoot(), !0), e
            }, i.setValue)
          }(e, l, o), e.__controllers.push(o), o
      }

      function _(e, t) {
        return document.location.href + "." + t
      }

      function f(e, t, a) {
        var n = document.createElement("option");
        n.innerHTML = t, n.value = t, e.__preset_select.appendChild(n), a && (e.__preset_select.selectedIndex = e.__preset_select.length - 1)
      }

      function h(e, t) {
        t.style.display = e.useLocalStorage ? "block" : "none"
      }

      function g(e, t) {
        e.domElement.style.width = t + "px", e.__save_row && e.autoPlace && (e.__save_row.style.width = t + "px"), e.__closeButton && (e.__closeButton.style.width = t + "px")
      }

      function o(o, i) {
        var r = {};
        return P.default.each(o.__rememberedObjects, function (e, t) {
          var a = {},
            n = o.__rememberedObjectIndecesToControllers[t];
          P.default.each(n, function (e, t) {
            a[t] = i ? e.initialValue : e.getValue()
          }), r[t] = a
        }), r
      }
      var p = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
          return typeof e
        } : function (e) {
          return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e
        },
        i = n(a(18)),
        r = n(a(19)),
        A = n(a(20)),
        v = n(a(7)),
        x = n(a(8)),
        b = n(a(15)),
        E = n(a(13)),
        T = n(a(14)),
        y = n(a(16)),
        s = n(a(21)),
        l = n(a(22)),
        F = n(a(9)),
        P = n(a(5)),
        w = n(a(23));
      i.default.inject(w.default);
      var N = "Default",
        S = function () {
          try {
            return "localStorage" in window && null !== window.localStorage
          } catch (e) {
            return !1
          }
        }(),
        R = void 0,
        L = !0,
        C = void 0,
        I = !1,
        H = [],
        U = function t(e) {
          var a = this,
            n = e || {};
          this.domElement = document.createElement("div"), this.__ul = document.createElement("ul"), this.domElement.appendChild(this.__ul), F.default.addClass(this.domElement, "dg"), this.__folders = {}, this.__controllers = [], this.__rememberedObjects = [], this.__rememberedObjectIndecesToControllers = [], this.__listening = [], n = P.default.defaults(n, {
            autoPlace: !0,
            width: t.DEFAULT_WIDTH
          }), n = P.default.defaults(n, {
            resizable: n.autoPlace,
            hideable: n.autoPlace
          }), P.default.isUndefined(n.load) ? n.load = {
            preset: N
          } : n.preset && (n.load.preset = n.preset), P.default.isUndefined(n.parent) && n.hideable && H.push(this), n.resizable = P.default.isUndefined(n.parent) && n.resizable, n.autoPlace && P.default.isUndefined(n.scrollable) && (n.scrollable = !0);
          var o, i, r, s = S && "true" === localStorage.getItem(_(0, "isLocal")),
            l = void 0;
          if (Object.defineProperties(this, {
              parent: {
                get: function () {
                  return n.parent
                }
              },
              scrollable: {
                get: function () {
                  return n.scrollable
                }
              },
              autoPlace: {
                get: function () {
                  return n.autoPlace
                }
              },
              preset: {
                get: function () {
                  return a.parent ? a.getRoot().preset : n.load.preset
                },
                set: function (e) {
                  a.parent ? a.getRoot().preset = e : n.load.preset = e,
                    function (e) {
                      for (var t = 0; t < e.__preset_select.length; t++) e.__preset_select[t].value === e.preset && (e.__preset_select.selectedIndex = t)
                    }(this), a.revert()
                }
              },
              width: {
                get: function () {
                  return n.width
                },
                set: function (e) {
                  n.width = e, g(a, e)
                }
              },
              name: {
                get: function () {
                  return n.name
                },
                set: function (e) {
                  n.name = e, titleRowName && (titleRowName.innerHTML = n.name)
                }
              },
              closed: {
                get: function () {
                  return n.closed
                },
                set: function (e) {
                  n.closed = e, n.closed ? F.default.addClass(a.__ul, t.CLASS_CLOSED) : F.default.removeClass(a.__ul, t.CLASS_CLOSED), this.onResize(), a.__closeButton && (a.__closeButton.innerHTML = e ? t.TEXT_OPEN : t.TEXT_CLOSED)
                }
              },
              load: {
                get: function () {
                  return n.load
                }
              },
              useLocalStorage: {
                get: function () {
                  return s
                },
                set: function (e) {
                  S && ((s = e) ? F.default.bind(window, "unload", l) : F.default.unbind(window, "unload", l), localStorage.setItem(_(0, "isLocal"), e))
                }
              }
            }), P.default.isUndefined(n.parent)) {
            if (n.closed = !1, F.default.addClass(this.domElement, t.CLASS_MAIN), F.default.makeSelectable(this.domElement, !1), S && s) {
              a.useLocalStorage = !0;
              var d = localStorage.getItem(_(0, "gui"));
              d && (n.load = JSON.parse(d))
            }
            this.__closeButton = document.createElement("div"), this.__closeButton.innerHTML = t.TEXT_CLOSED, F.default.addClass(this.__closeButton, t.CLASS_CLOSE_BUTTON), this.domElement.appendChild(this.__closeButton), F.default.bind(this.__closeButton, "click", function () {
              a.closed = !a.closed
            })
          } else {
            void 0 === n.closed && (n.closed = !0);
            var u = document.createTextNode(n.name);
            F.default.addClass(u, "controller-name");
            var c = m(a, u);
            F.default.addClass(this.__ul, t.CLASS_CLOSED), F.default.addClass(c, "title"), F.default.bind(c, "click", function (e) {
              return e.preventDefault(), a.closed = !a.closed, !1
            }), n.closed || (this.closed = !1)
          }

          function f(e) {
            return e.preventDefault(), i.width += r - e.clientX, i.onResize(), r = e.clientX, !1
          }

          function h() {
            F.default.removeClass(i.__closeButton, U.CLASS_DRAG), F.default.unbind(window, "mousemove", f), F.default.unbind(window, "mouseup", h)
          }

          function p(e) {
            return e.preventDefault(), r = e.clientX, F.default.addClass(i.__closeButton, U.CLASS_DRAG), F.default.bind(window, "mousemove", f), F.default.bind(window, "mouseup", h), !1
          }
          n.autoPlace && (P.default.isUndefined(n.parent) && (L && (C = document.createElement("div"), F.default.addClass(C, "dg"), F.default.addClass(C, t.CLASS_AUTO_PLACE_CONTAINER), document.body.appendChild(C), L = !1), C.appendChild(this.domElement), F.default.addClass(this.domElement, t.CLASS_AUTO_PLACE)), this.parent || g(a, n.width)), this.__resizeHandler = function () {
            a.onResizeDebounced()
          }, F.default.bind(window, "resize", this.__resizeHandler), F.default.bind(this.__ul, "webkitTransitionEnd", this.__resizeHandler), F.default.bind(this.__ul, "transitionend", this.__resizeHandler), F.default.bind(this.__ul, "oTransitionEnd", this.__resizeHandler), this.onResize(), n.resizable && (r = void 0, (i = this).__resize_handle = document.createElement("div"), P.default.extend(i.__resize_handle.style, {
            width: "6px",
            marginLeft: "-3px",
            height: "200px",
            cursor: "ew-resize",
            position: "absolute"
          }), F.default.bind(i.__resize_handle, "mousedown", p), F.default.bind(i.__closeButton, "mousedown", p), i.domElement.insertBefore(i.__resize_handle, i.domElement.firstElementChild)), l = function () {
            S && "true" === localStorage.getItem(_(0, "isLocal")) && localStorage.setItem(_(0, "gui"), JSON.stringify(a.getSaveObject()))
          }, this.saveToLocalStorageIfPossible = l, n.parent || ((o = a.getRoot()).width += 1, P.default.defer(function () {
            --o.width
          }))
        };
      U.toggleHide = function () {
        I = !I, P.default.each(H, function (e) {
          e.domElement.style.display = I ? "none" : ""
        })
      }, U.CLASS_AUTO_PLACE = "a", U.CLASS_AUTO_PLACE_CONTAINER = "ac", U.CLASS_MAIN = "main", U.CLASS_CONTROLLER_ROW = "cr", U.CLASS_TOO_TALL = "taller-than-window", U.CLASS_CLOSED = "closed", U.CLASS_CLOSE_BUTTON = "close-button", U.CLASS_DRAG = "drag", U.DEFAULT_WIDTH = 245, U.TEXT_CLOSED = "Close Controls", U.TEXT_OPEN = "Open Controls", U._keydownHandler = function (e) {
        "text" === document.activeElement.type || 72 !== e.which && 72 !== e.keyCode || U.toggleHide()
      }, F.default.bind(window, "keydown", U._keydownHandler, !1), P.default.extend(U.prototype, {
        add: function (e, t) {
          return c(this, e, t, {
            factoryArgs: Array.prototype.slice.call(arguments, 2)
          })
        },
        addColor: function (e, t) {
          return c(this, e, t, {
            color: !0
          })
        },
        remove: function (e) {
          this.__ul.removeChild(e.__li), this.__controllers.splice(this.__controllers.indexOf(e), 1);
          var t = this;
          P.default.defer(function () {
            t.onResize()
          })
        },
        destroy: function () {
          this.autoPlace && C.removeChild(this.domElement), F.default.unbind(window, "keydown", U._keydownHandler, !1), F.default.unbind(window, "resize", this.__resizeHandler), this.saveToLocalStorageIfPossible && F.default.unbind(window, "unload", this.saveToLocalStorageIfPossible)
        },
        addFolder: function (e) {
          if (void 0 !== this.__folders[e]) throw new Error('You already have a folder in this GUI by the name "' + e + '"');
          var t = {
            name: e,
            parent: this
          };
          t.autoPlace = this.autoPlace, this.load && this.load.folders && this.load.folders[e] && (t.closed = this.load.folders[e].closed, t.load = this.load.folders[e]);
          var a = new U(t);
          this.__folders[e] = a;
          var n = m(this, a.domElement);
          return F.default.addClass(n, "folder"), a
        },
        open: function () {
          this.closed = !1
        },
        close: function () {
          this.closed = !0
        },
        onResize: function () {
          var t = this.getRoot();
          if (t.scrollable) {
            var e = F.default.getOffset(t.__ul).top,
              a = 0;
            P.default.each(t.__ul.childNodes, function (e) {
              t.autoPlace && e === t.__save_row || (a += F.default.getHeight(e))
            }), window.innerHeight - e - 20 < a ? (F.default.addClass(t.domElement, U.CLASS_TOO_TALL), t.__ul.style.height = window.innerHeight - e - 20 + "px") : (F.default.removeClass(t.domElement, U.CLASS_TOO_TALL), t.__ul.style.height = "auto")
          }
          t.__resize_handle && P.default.defer(function () {
            t.__resize_handle.style.height = t.__ul.offsetHeight + "px"
          }), t.__closeButton && (t.__closeButton.style.width = t.width + "px")
        },
        onResizeDebounced: P.default.debounce(function () {
          this.onResize()
        }, 200),
        remember: function () {
          if (P.default.isUndefined(R) && ((R = new l.default).domElement.innerHTML = r.default), this.parent) throw new Error("You can only call remember on a top level GUI.");
          var t = this;
          P.default.each(Array.prototype.slice.call(arguments), function (e) {
            0 === t.__rememberedObjects.length && function (a) {
              var e = a.__save_row = document.createElement("li");
              F.default.addClass(a.domElement, "has-save"), a.__ul.insertBefore(e, a.__ul.firstChild), F.default.addClass(e, "save-row");
              var t = document.createElement("span");
              t.innerHTML = "&nbsp;", F.default.addClass(t, "button gears");
              var n = document.createElement("span");
              n.innerHTML = "Save", F.default.addClass(n, "button"), F.default.addClass(n, "save");
              var o = document.createElement("span");
              o.innerHTML = "New", F.default.addClass(o, "button"), F.default.addClass(o, "save-as");
              var i = document.createElement("span");
              i.innerHTML = "Revert", F.default.addClass(i, "button"), F.default.addClass(i, "revert");
              var r, s, l = a.__preset_select = document.createElement("select");
              a.load && a.load.remembered ? P.default.each(a.load.remembered, function (e, t) {
                f(a, t, t === a.preset)
              }) : f(a, N, !1), F.default.bind(l, "change", function () {
                for (var e = 0; e < a.__preset_select.length; e++) a.__preset_select[e].innerHTML = a.__preset_select[e].value;
                a.preset = this.value
              }), e.appendChild(l), e.appendChild(t), e.appendChild(n), e.appendChild(o), e.appendChild(i), S && (r = document.getElementById("dg-local-explain"), s = document.getElementById("dg-local-storage"), document.getElementById("dg-save-locally").style.display = "block", "true" === localStorage.getItem(_(0, "isLocal")) && s.setAttribute("checked", "checked"), h(a, r), F.default.bind(s, "change", function () {
                a.useLocalStorage = !a.useLocalStorage, h(a, r)
              }));
              var d = document.getElementById("dg-new-constructor");
              F.default.bind(d, "keydown", function (e) {
                !e.metaKey || 67 !== e.which && 67 !== e.keyCode || R.hide()
              }), F.default.bind(t, "click", function () {
                d.innerHTML = JSON.stringify(a.getSaveObject(), void 0, 2), R.show(), d.focus(), d.select()
              }), F.default.bind(n, "click", function () {
                a.save()
              }), F.default.bind(o, "click", function () {
                var e = prompt("Enter a new preset name.");
                e && a.saveAs(e)
              }), F.default.bind(i, "click", function () {
                a.revert()
              })
            }(t), -1 === t.__rememberedObjects.indexOf(e) && t.__rememberedObjects.push(e)
          }), this.autoPlace && g(this, this.width)
        },
        getRoot: function () {
          for (var e = this; e.parent;) e = e.parent;
          return e
        },
        getSaveObject: function () {
          var a = this.load;
          return a.closed = this.closed, 0 < this.__rememberedObjects.length && (a.preset = this.preset, a.remembered || (a.remembered = {}), a.remembered[this.preset] = o(this)), a.folders = {}, P.default.each(this.__folders, function (e, t) {
            a.folders[t] = e.getSaveObject()
          }), a
        },
        save: function () {
          this.load.remembered || (this.load.remembered = {}), this.load.remembered[this.preset] = o(this), d(this, !1), this.saveToLocalStorageIfPossible()
        },
        saveAs: function (e) {
          this.load.remembered || (this.load.remembered = {}, this.load.remembered[N] = o(this, !0)), this.load.remembered[e] = o(this), this.preset = e, f(this, e, !0), this.saveToLocalStorageIfPossible()
        },
        revert: function (t) {
          P.default.each(this.__controllers, function (e) {
            this.getRoot().load.remembered ? u(t || this.getRoot(), e) : e.setValue(e.initialValue), e.__onFinishChange && e.__onFinishChange.call(e, e.getValue())
          }, this), P.default.each(this.__folders, function (e) {
            e.revert(e)
          }), t || d(this.getRoot(), !1)
        },
        listen: function (e) {
          var t = 0 === this.__listening.length;
          this.__listening.push(e), t && function e(t) {
            0 !== t.length && s.default.call(window, function () {
              e(t)
            }), P.default.each(t, function (e) {
              e.updateDisplay()
            })
          }(this.__listening)
        },
        updateDisplay: function () {
          P.default.each(this.__controllers, function (e) {
            e.updateDisplay()
          }), P.default.each(this.__folders, function (e) {
            e.updateDisplay()
          })
        }
      }), e.exports = U
    }, function (e, t) {
      "use strict";
      e.exports = {
        load: function (e, t) {
          var a = t || document,
            n = a.createElement("link");
          n.type = "text/css", n.rel = "stylesheet", n.href = e, a.getElementsByTagName("head")[0].appendChild(n)
        },
        inject: function (e, t) {
          var a = t || document,
            n = document.createElement("style");
          n.type = "text/css", n.innerHTML = e;
          var o = a.getElementsByTagName("head")[0];
          try {
            o.appendChild(n)
          } catch (e) {}
        }
      }
    }, function (e, t) {
      e.exports = "<div id=dg-save class=\"dg dialogue\"> Here's the new load parameter for your <code>GUI</code>'s constructor: <textarea id=dg-new-constructor></textarea> <div id=dg-save-locally> <input id=dg-local-storage type=checkbox /> Automatically save values to <code>localStorage</code> on exit. <div id=dg-local-explain>The values saved to <code>localStorage</code> will override those passed to <code>dat.GUI</code>'s constructor. This makes it easier to work incrementally, but <code>localStorage</code> is fragile, and your friends may not see the same values you do. </div> </div> </div>"
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.__esModule = !0;
      var o = n(a(10)),
        i = n(a(13)),
        r = n(a(14)),
        s = n(a(11)),
        l = n(a(15)),
        d = n(a(8)),
        u = n(a(5));
      t.default = function (e, t) {
        var a = e[t];
        return u.default.isArray(arguments[2]) || u.default.isObject(arguments[2]) ? new o.default(e, t, arguments[2]) : u.default.isNumber(a) ? u.default.isNumber(arguments[2]) && u.default.isNumber(arguments[3]) ? u.default.isNumber(arguments[4]) ? new r.default(e, t, arguments[2], arguments[3], arguments[4]) : new r.default(e, t, arguments[2], arguments[3]) : u.default.isNumber(arguments[4]) ? new i.default(e, t, {
          min: arguments[2],
          max: arguments[3],
          step: arguments[4]
        }) : new i.default(e, t, {
          min: arguments[2],
          max: arguments[3]
        }) : u.default.isString(a) ? new s.default(e, t) : u.default.isFunction(a) ? new l.default(e, t, "") : u.default.isBoolean(a) ? new d.default(e, t) : null
      }
    }, function (e, t) {
      "use strict";
      t.__esModule = !0, t.default = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
        setTimeout(e, 1e3 / 60)
      }
    }, function (e, t, a) {
      "use strict";

      function n(e) {
        return e && e.__esModule ? e : {
          default: e
        }
      }
      t.__esModule = !0;
      var o = n(a(9)),
        i = n(a(5)),
        r = (s.prototype.show = function () {
          var e = this;
          this.backgroundElement.style.display = "block", this.domElement.style.display = "block", this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)", this.layout(), i.default.defer(function () {
            e.backgroundElement.style.opacity = 1, e.domElement.style.opacity = 1, e.domElement.style.webkitTransform = "scale(1)"
          })
        }, s.prototype.hide = function () {
          function e() {
            t.domElement.style.display = "none", t.backgroundElement.style.display = "none", o.default.unbind(t.domElement, "webkitTransitionEnd", e), o.default.unbind(t.domElement, "transitionend", e), o.default.unbind(t.domElement, "oTransitionEnd", e)
          }
          var t = this;
          o.default.bind(this.domElement, "webkitTransitionEnd", e), o.default.bind(this.domElement, "transitionend", e), o.default.bind(this.domElement, "oTransitionEnd", e), this.backgroundElement.style.opacity = 0, this.domElement.style.opacity = 0, this.domElement.style.webkitTransform = "scale(1.1)"
        }, s.prototype.layout = function () {
          this.domElement.style.left = window.innerWidth / 2 - o.default.getWidth(this.domElement) / 2 + "px", this.domElement.style.top = window.innerHeight / 2 - o.default.getHeight(this.domElement) / 2 + "px"
        }, s);

      function s() {
        (function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
        })(this, s), this.backgroundElement = document.createElement("div"), i.default.extend(this.backgroundElement.style, {
          backgroundColor: "rgba(0,0,0,0.8)",
          top: 0,
          left: 0,
          display: "none",
          zIndex: "1000",
          opacity: 0,
          WebkitTransition: "opacity 0.2s linear",
          transition: "opacity 0.2s linear"
        }), o.default.makeFullscreen(this.backgroundElement), this.backgroundElement.style.position = "fixed", this.domElement = document.createElement("div"), i.default.extend(this.domElement.style, {
          position: "fixed",
          display: "none",
          zIndex: "1001",
          opacity: 0,
          WebkitTransition: "-webkit-transform 0.2s ease-out, opacity 0.2s linear",
          transition: "transform 0.2s ease-out, opacity 0.2s linear"
        }), document.body.appendChild(this.backgroundElement), document.body.appendChild(this.domElement);
        var e = this;
        o.default.bind(this.backgroundElement, "click", function () {
          e.hide()
        })
      }
      t.default = r
    }, function (e, t, a) {
      (e.exports = a(24)()).push([e.id, ".dg ul{list-style:none;margin:0;padding:0;width:100%;clear:both}.dg.ac{position:fixed;top:60px;left:0;right:0;height:0;z-index:0}.dg:not(.ac) .main{overflow:hidden}.dg.main{-webkit-transition:opacity .1s linear;transition:opacity .1s linear}.dg.main.taller-than-window{overflow-y:auto}.dg.main.taller-than-window .close-button{opacity:1;margin-top:-1px;border-top:1px solid #2c2c2c}.dg.main ul.closed .close-button{opacity:1!important}.dg.main .close-button.drag,.dg.main:hover .close-button{opacity:1}.dg.main .close-button{-webkit-transition:opacity .1s linear;transition:opacity .1s linear;border:0;position:absolute;line-height:19px;height:20px;cursor:pointer;text-align:center;background-color:#000}.dg.main .close-button:hover{background-color:#111}.dg.a{float:right;margin-right:15px;overflow-x:hidden}.dg.a.has-save>ul{margin-top:27px}.dg.a.has-save>ul.closed{margin-top:0}.dg.a .save-row{position:fixed;top:0;z-index:1002}.dg li{-webkit-transition:height .1s ease-out;transition:height .1s ease-out}.dg li:not(.folder){cursor:auto;height:27px;line-height:27px;overflow:hidden;padding:0 4px 0 5px}.dg li.folder{padding:0;border-left:4px solid transparent}.dg li.title{cursor:pointer;margin-left:-4px}.dg .closed li:not(.title),.dg .closed ul li,.dg .closed ul li>*{height:0;overflow:hidden;border:0}.dg .cr{clear:both;padding-left:3px;height:27px}.dg .property-name{cursor:default;float:left;clear:left;width:40%;overflow:hidden;text-overflow:ellipsis}.dg .c{float:left;width:60%}.dg .c input[type=text]{border:0;margin-top:4px;padding:3px;width:100%;float:right}.dg .has-slider input[type=text]{width:30%;margin-left:0}.dg .slider{float:left;width:66%;margin-left:-5px;margin-right:0;height:19px;margin-top:4px}.dg .slider-fg{height:100%}.dg .c input[type=checkbox]{margin-top:9px}.dg .c select{margin-top:5px}.dg .cr.boolean,.dg .cr.boolean *,.dg .cr.function,.dg .cr.function *,.dg .cr.function .property-name{cursor:pointer}.dg .selector{display:none;position:absolute;margin-left:-9px;margin-top:23px;z-index:10}.dg .c:hover .selector,.dg .selector.drag{display:block}.dg li.save-row{padding:0}.dg li.save-row .button{display:inline-block;padding:0 6px}.dg.dialogue{background-color:#222;width:460px;padding:15px;font-size:13px;line-height:15px}#dg-new-constructor{padding:10px;color:#222;font-family:Monaco,monospace;font-size:10px;border:0;resize:none;box-shadow:inset 1px 1px 1px #888;word-wrap:break-word;margin:12px 0;display:block;width:440px;overflow-y:scroll;height:100px;position:relative}#dg-local-explain{display:none;font-size:11px;line-height:17px;border-radius:3px;background-color:#333;padding:8px;margin-top:10px}#dg-local-explain code{font-size:10px}#dat-gui-save-locally{display:none}.dg{color:#eee;font:11px Lucida Grande,sans-serif;text-shadow:0 -1px 0 #111}.dg.main::-webkit-scrollbar{width:5px;background:#1a1a1a}.dg.main::-webkit-scrollbar-corner{height:0;display:none}.dg.main::-webkit-scrollbar-thumb{border-radius:5px;background:#676767}.dg li:not(.folder){background:#1a1a1a;border-bottom:1px solid #2c2c2c}.dg li.save-row{line-height:25px;background:#dad5cb;border:0}.dg li.save-row select{margin-left:5px;width:108px}.dg li.save-row .button{margin-left:5px;margin-top:1px;border-radius:2px;font-size:9px;line-height:7px;padding:4px 4px 5px;background:#c5bdad;color:#fff;text-shadow:0 1px 0 #b0a58f;box-shadow:0 -1px 0 #b0a58f;cursor:pointer}.dg li.save-row .button.gears{background:#c5bdad url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAANCAYAAAB/9ZQ7AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAQJJREFUeNpiYKAU/P//PwGIC/ApCABiBSAW+I8AClAcgKxQ4T9hoMAEUrxx2QSGN6+egDX+/vWT4e7N82AMYoPAx/evwWoYoSYbACX2s7KxCxzcsezDh3evFoDEBYTEEqycggWAzA9AuUSQQgeYPa9fPv6/YWm/Acx5IPb7ty/fw+QZblw67vDs8R0YHyQhgObx+yAJkBqmG5dPPDh1aPOGR/eugW0G4vlIoTIfyFcA+QekhhHJhPdQxbiAIguMBTQZrPD7108M6roWYDFQiIAAv6Aow/1bFwXgis+f2LUAynwoIaNcz8XNx3Dl7MEJUDGQpx9gtQ8YCueB+D26OECAAQDadt7e46D42QAAAABJRU5ErkJggg==) 2px 1px no-repeat;height:7px;width:8px}.dg li.save-row .button:hover{background-color:#bab19e;box-shadow:0 -1px 0 #b0a58f}.dg li.folder{border-bottom:0}.dg li.title{padding-left:16px;background:#000 url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlI+hKgFxoCgAOw==) 6px 10px no-repeat;cursor:pointer;border-bottom:1px solid hsla(0,0%,100%,.2)}.dg .closed li.title{background-image:url(data:image/gif;base64,R0lGODlhBQAFAJEAAP////Pz8////////yH5BAEAAAIALAAAAAAFAAUAAAIIlGIWqMCbWAEAOw==)}.dg .cr.boolean{border-left:3px solid #806787}.dg .cr.color{border-left:3px solid}.dg .cr.function{border-left:3px solid #e61d5f}.dg .cr.number{border-left:3px solid #2fa1d6}.dg .cr.number input[type=text]{color:#2fa1d6}.dg .cr.string{border-left:3px solid #1ed36f}.dg .cr.string input[type=text]{color:#1ed36f}.dg .cr.boolean:hover,.dg .cr.function:hover{background:#111}.dg .c input[type=text]{background:#303030;outline:none}.dg .c input[type=text]:hover{background:#3c3c3c}.dg .c input[type=text]:focus{background:#494949;color:#fff}.dg .c .slider{background:#303030;cursor:ew-resize}.dg .c .slider-fg{background:#2fa1d6;max-width:100%}.dg .c .slider:hover{background:#3c3c3c}.dg .c .slider:hover .slider-fg{background:#44abda}", ""])
    }, function (e, t) {
      e.exports = function () {
        var r = [];
        return r.toString = function () {
          for (var e = [], t = 0; t < this.length; t++) {
            var a = this[t];
            a[2] ? e.push("@media " + a[2] + "{" + a[1] + "}") : e.push(a[1])
          }
          return e.join("")
        }, r.i = function (e, t) {
          "string" == typeof e && (e = [
            [null, e, ""]
          ]);
          for (var a = {}, n = 0; n < this.length; n++) {
            var o = this[n][0];
            "number" == typeof o && (a[o] = !0)
          }
          for (n = 0; n < e.length; n++) {
            var i = e[n];
            "number" == typeof i[0] && a[i[0]] || (t && !i[2] ? i[2] = t : t && (i[2] = "(" + i[2] + ") and (" + t + ")"), r.push(i))
          }
        }, r
      }
    }], a.c = o, a.p = "", a(0);

    function a(e) {
      if (o[e]) return o[e].exports;
      var t = o[e] = {
        exports: {},
        id: e,
        loaded: !1
      };
      return n[e].call(t.exports, t, t.exports, a), t.loaded = !0, t.exports
    }
    var n, o
  }), Detector.webgl || Detector.addGetWebGLMessage();
var camera, scene, renderer, stats, controls, cameraRTT, sceneRTT, rtTexture, quadRTT, matRTT, quad_geo, quad_mat, quad, composer, renderPass, canvas2d, ctx, loadingManager, countProgress, debug = !1,
  USE_SHADER_FILE = 0,
  USE_SHADER_INLINE = 1,
  USE_FIXED = 0,
  USE_PALETTE = 1,
  postprocessing = {},
  canvasW = window.innerWidth,
  canvasH = 1400 < canvasW ? 600 : 480,
  canvasD = 500,
  GLOBAL_SIZE_FACTOR = canvasW / 1400,
  GLOBAL_SIZE_BOUNDING = canvasW / 2,
  frame = 0,
  isFrameControlling = !1;

function loadPaintData(e, t) {
  $.getScript(__paint_script_path__, function () {
    pickPalette(), e(), t()
  })
}

function pickPalette() {
  var e = Math.floor(Math.random() * palette_list.length),
    t = palette_list[e];
  for (var a in PaintData.paletteShuffle && shuffleArray(t), PaintData.palette) PaintData.palette[a] = "#" + t[parseInt(a[6])]
}

function initPaint() {
  initRenderer(), PaintData.rtt.renderToTexture && initRendererToTexture(), PaintData.geometry && ((loadingManager = new THREE.LoadingManager).onProgress = function (e, t, a) {
    t === a && $("#loading_cover").hide()
  }, countProgress = function (e) {
    if (e.lengthComputable) {
      var t = e.loaded / e.total * 100,
        a = Math.round(t, 2) + "%";
      indicator.innerHTML = a, progress.style.width = Math.round(t, 2) + "px"
    }
  }), buildResources(), buildObjects(loadingManager, countProgress), UI.build(), PaintData.postEFX.useEffects && buildPostEFX()
}

function initRenderer() {
  (camera = void 0 === PaintData.cameraSetting.type ? new THREE.OrthographicCamera(canvasW / -2, canvasW / 2, canvasH / 2, canvasH / -2, .01, 1e4) : new THREE.PerspectiveCamera(50, canvasW / canvasH, 1, 5e3)).position.x = PaintData.cameraSetting.x, camera.position.y = PaintData.cameraSetting.y, camera.position.z = PaintData.cameraSetting.z, scene = new THREE.Scene, PaintData.sceneSetting.type === USE_FIXED ? (void 0 === PaintData.sceneSetting.background ? scene.background = 0 : scene.background = new THREE.Color(PaintData.sceneSetting.background), PaintData.sceneSetting.fog && (scene.fog = PaintData.sceneSetting.fog)) : scene.background = new THREE.Color(PaintData.palette["color-0"]);
  new THREE.AxesHelper(25), new THREE.GridHelper(100, 10);
  (renderer = new THREE.WebGLRenderer({
    antialias: !0,
    preserveDrawingBuffer: !0
  })).setPixelRatio(window.devicePixelRatio), renderer.setSize(canvasW, canvasH), renderer.domElement.setAttribute("id", "canvas_painter"), controls = new THREE.OrbitControls(camera, renderer.domElement), 1 == debug ? controls.enabled = !0 : (controls.enabled = PaintData.controls.enabled, controls.minAzimuthAngle = PaintData.controls.minAzimuthAngle || -Math.PI, controls.maxAzimuthAngle = PaintData.controls.maxAzimuthAngle || Math.PI, controls.minPolarAngle = PaintData.controls.minPolarAngle || 0, controls.maxPolarAngle = PaintData.controls.maxPolarAngle || Math.PI), stats = new Stats, monitor_panel.appendChild(stats.dom), container.appendChild(renderer.domElement), window.addEventListener("resize", onWindowResize, !1)
}

function initRendererToTexture() {
  rtt_w = PaintData.rtt.rtt_size_w, rtt_h = PaintData.rtt.rtt_size_h, (cameraRTT = new THREE.OrthographicCamera(rtt_w / -2, rtt_w / 2, rtt_h / 2, rtt_h / -2, -1e4, 1e4)).position.z = 400, sceneRTT = new THREE.Scene, rtTexture = new THREE.WebGLRenderTarget(rtt_w, rtt_h, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBFormat
  }), matRTT = new THREE.ShaderMaterial({
    uniforms: {
      u_time: {
        value: 0
      },
      u_resolution: {
        value: new THREE.Vector2(rtt_w, rtt_h)
      },
      u_color_0: {
        value: new THREE.Color(PaintData.palette["color-0"])
      },
      u_color_1: {
        value: new THREE.Color(PaintData.palette["color-1"])
      },
      u_color_2: {
        value: new THREE.Color(PaintData.palette["color-2"])
      },
      u_color_3: {
        value: new THREE.Color(PaintData.palette["color-3"])
      },
      u_color_4: {
        value: new THREE.Color(PaintData.palette["color-4"])
      },
      u_color_5: {
        value: new THREE.Color(PaintData.palette["color-5"])
      }
    },
    vertexShader: document.getElementById("init_vertex_shader").textContent,
    fragmentShader: document.getElementById("init_fragment_shader").textContent
  }), PaintData.rtt.rtt_source === USE_SHADER_FILE ? loadShaderFromFile(__rtt_glsl_directory__ + PaintData.rtt.rtt_source_file, function (e) {
    matRTT.fragmentShader = e, matRTT.needsUpdate = !0
  }) : matRTT.fragmentShader = rtt_frag_shader;
  var e = new THREE.Mesh(new THREE.PlaneBufferGeometry(rtt_w, rtt_h), matRTT);
  sceneRTT.add(e)
}

function buildPostEFX() {
  (composer = new THREE.EffectComposer(renderer)).addPass(new THREE.RenderPass(scene, camera));
  for (var e = 0, t = PaintData.postEFX.effects.length; e < t; e++) {
    var a, n = PaintData.postEFX.effects[e],
      o = n.name,
      i = n.params;
    switch (o) {
      case "filmPass":
        a = new THREE.FilmPass(i.noiseIntensity, i.scanlinesIntensity, i.scanlinesCount, i.grayscale);
        break;
      case "bloomPass":
        if (a = new THREE.UnrealBloomPass(new THREE.Vector2(canvasW, canvasH), i.strength, i.radius, i.threshold), debug)(r = gui.addFolder(o)).open(), r.add(i, "strength", 0, 10).onChange(function (e) {
          postprocessing.bloomPass.strength = Number(e)
        }), r.add(i, "radius", 0, 2).onChange(function (e) {
          postprocessing.bloomPass.radius = Number(e)
        }), r.add(i, "threshold", .01, 1).onChange(function (e) {
          postprocessing.bloomPass.threshold = Number(e)
        });
        break;
      case "tiltShiftPass":
        var r;
        if ((a = new THREE.ShaderPass(THREE.VerticalTiltShiftShader)).uniforms.focusPos.value = i.tiltFocus, a.uniforms.amount.value = i.tiltAmount, a.uniforms.brightness.value = i.tiltBrightness, debug)(r = gui.addFolder(o)).open(), r.add(i, "tiltFocus", 0, 2).onChange(function (e) {
          postprocessing.tiltShiftPass.uniforms.focusPos.value = Number(e)
        }), r.add(i, "tiltAmount", 0, .01).onChange(function (e) {
          postprocessing.tiltShiftPass.uniforms.amount.value = Number(e)
        }), r.add(i, "tiltBrightness", .01, 1).onChange(function (e) {
          postprocessing.tiltShiftPass.uniforms.brightness.value = Number(e)
        });
        break;
      case "FXAAPass":
        (a = new THREE.ShaderPass(THREE.FXAAShader)).uniforms.resolution.value.set(1 / canvasW, 1 / canvasH)
    }
    e == t - 1 && (a.renderToScreen = !0), composer.addPass(a), postprocessing[o] = a
  }
}

function onWindowResize() {
  camera.aspect = canvasW / canvasH, camera.updateProjectionMatrix(), renderer.setSize(canvasW, canvasH)
}

function animate() {
  requestAnimationFrame(animate), isFrameControlling || 3141 == ++frame && (frame = 0), animateObjects(), stats.update(), UI.updateFrameMeter(frame % 314 / 314), render()
}

function render() {
  PaintData.rtt.renderToTexture && (renderer.clear(), renderer.render(sceneRTT, cameraRTT, rtTexture, !0)), PaintData.postEFX.useEffects ? composer.render() : renderer.render(scene, camera)
}
var Stats = function () {
  function e(e) {
    return n.appendChild(e.dom), e
  }

  function t(e) {
    for (var t = 0; t < n.children.length; t++) n.children[t].style.display = t === e ? "block" : "none";
    a = e
  }
  var a = 0,
    n = document.createElement("div");
  n.style.cssText = "position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000", n.addEventListener("click", function (e) {
    e.preventDefault(), t(++a % n.children.length)
  }, !1);
  var o = (performance || Date).now(),
    i = o,
    r = 0,
    s = e(new Stats.Panel("FPS", "#0ff", "#002")),
    l = e(new Stats.Panel("MS", "#0f0", "#020"));
  if (self.performance && self.performance.memory) var d = e(new Stats.Panel("MB", "#f08", "#201"));
  return t(0), {
    REVISION: 16,
    dom: n,
    addPanel: e,
    showPanel: t,
    begin: function () {
      o = (performance || Date).now()
    },
    end: function () {
      r++;
      var e = (performance || Date).now();
      if (l.update(e - o, 200), i + 1e3 < e && (s.update(1e3 * r / (e - i), 100), i = e, r = 0, d)) {
        var t = performance.memory;
        d.update(t.usedJSHeapSize / 1048576, t.jsHeapSizeLimit / 1048576)
      }
      return e
    },
    update: function () {
      o = this.end()
    },
    domElement: n,
    setMode: t
  }
};
Stats.Panel = function (a, n, o) {
  var i = 1 / 0,
    r = 0,
    s = Math.round,
    l = s(window.devicePixelRatio || 1),
    d = 80 * l,
    e = 48 * l,
    u = 3 * l,
    c = 2 * l,
    f = 3 * l,
    h = 15 * l,
    p = 74 * l,
    m = 30 * l,
    _ = document.createElement("canvas");
  _.width = d, _.height = e, _.style.cssText = "width:80px;height:48px";
  var g = _.getContext("2d");
  return g.font = "bold " + 9 * l + "px Helvetica,Arial,sans-serif", g.textBaseline = "top", g.fillStyle = o, g.fillRect(0, 0, d, e), g.fillStyle = n, g.fillText(a, u, c), g.fillRect(f, h, p, m), g.fillStyle = o, g.globalAlpha = .9, g.fillRect(f, h, p, m), {
    dom: _,
    update: function (e, t) {
      i = Math.min(i, e), r = Math.max(r, e), g.fillStyle = o, g.globalAlpha = 1, g.fillRect(0, 0, d, h), g.fillStyle = n, g.fillText(s(e) + " " + a + " (" + s(i) + "-" + s(r) + ")", u, c), g.drawImage(_, f + l, h, p - l, m, f, h, p - l, m), g.fillRect(f + p - l, h, l, m), g.fillStyle = o, g.globalAlpha = .9, g.fillRect(f + p - l, h, l, s((1 - e / t) * m))
    }
  }
}, "object" == typeof module && (module.exports = Stats);
var UI = {
  ctx: null,
  build: function () {
    debug && $("#monitor_panel").show(), $(".paint-title").html(paint_title), $("#container").css("height", canvasH + "px"), $("#frame_control").click(function () {
      $(this).find(".icon").toggleClass("play"), isFrameControlling = !isFrameControlling
    }), $("#reset_pattern").click(function () {
      reset()
    }), $("#shuffle_color").click(function () {
      pickPalette(), updateColors(), gui.updateDisplay()
    }), $(".ctrl-screensize").click(function () {
      var e = $(this).data("width"),
        t = $(this).data("height"),
        a = 1,
        n = 0,
        o = 0;
      o = 0 == e ? (a = 1, n = "-50vw", -(t = 1400 < (e = window.innerWidth) ? 600 : 480) / 2 + "px") : (a = .4, n = -e / 2 + "px", -t / 2 + "px"), canvas_painter.style.transform = "scale(" + a + ")", canvas_painter.style.marginLeft = n, canvas_painter.style.marginTop = o, renderer.setSize(e, t), "OrthographicCamera" == camera.type ? (camera.left = -e / 2, camera.right = e / 2, camera.top = t / 2, camera.bottom = -t / 2) : camera.aspect = e / t, camera.updateProjectionMatrix()
    }), $(".tab-select").click(function () {
      $(this).siblings().removeClass("selected"), $(this).addClass("selected")
    }), $("#btn_download").click(function (e) {
      $.ajax({
        url: __currentPath__ + "/download",
        type: "POST",
        processData: !1,
        contentType: !1,
        headers: {
          "X-CSRFtoken": $.cookie("csrftoken")
        },
        success: function (e) {
          console.log("download")
        }
      });
      var t = canvas_painter.toDataURL({
        format: "png"
      });
      console.log(t);
      t.substr(22, t.length);
      var a = dataURLtoBlob(t);
      download(a, (new Date).getTime(), "image/png")
    }), this.ctx = frameMeterCanvas.getContext("2d"), this.buildGUI()
  },
  buildGUI: function () {
    gui = new dat.GUI;
    var e = gui.addFolder("Color Theme");
    e.open();
    for (var t = Object.keys(PaintData.palette), a = 0; a < t.length; a++) e.addColor(PaintData.palette, "color-" + a).onFinishChange(function (e) {
      PaintData.palette["color-" + a] = e, updateColors()
    })
  },
  updateFrameMeter: function (e) {
    this.ctx.clearRect(0, 0, 44, 44), this.ctx.save(), this.ctx.translate(22, 22), this.ctx.fillStyle = "rgba( 255, 255, 255, 0.1)", this.ctx.beginPath(), this.ctx.moveTo(0, 0), this.ctx.arc(0, 0, 22, 0, 2 * e * Math.PI), this.ctx.closePath(), this.ctx.fill(), this.ctx.restore()
  }
};

function fract(e) {
  return e - Math.trunc(e)
}

function pseudoRand(e, t) {
  return fract(Math.sin(e) * t * 1e5)
}

function indexNoise(e, t) {
  var a = Math.floor(e / 10),
    n = e % 10 / 10;
  return THREE.Math.lerp(pseudoRand(a, t), pseudoRand(a + 1, t), THREE.Math.smoothstep(n, 0, 1))
}

function randomWithinScreen(e, t, a) {
  var n = (Math.random() - .5) * e,
    o = (Math.random() - .5) * t,
    i = (Math.random() - .5) * a;
  return new THREE.Vector3(n, o, i)
}

function shuffleArray(e) {
  for (var t, a, n = e.length; n;) a = e[t = Math.floor(Math.random() * n--)], e[t] = e[n], e[n] = a;
  return e
}

function loadShaderFromFile(e, t) {
  var a = new XMLHttpRequest;
  a.onreadystatechange = function () {
    4 === a.readyState && 200 === a.status && t(a.responseText)
  }, a.open("GET", e, !0), a.send()
}

function Grid(e, t, a, n, o, i) {
  this.xnum = e, this.ynum = t, this.znum = a, this.unitsize_width = n, this.unitsize_height = o, this.unitsize_depth = i, this.totalNum = this.xnum * this.ynum * this.znum, this.totalWidth = (this.xnum - 1) * n, this.totalHeight = (this.ynum - 1) * o, this.totalDepth = (this.znum - 1) * i, this.matrix = [], this.make()
}

function SurfaceConvex(e, t, a, n) {
  this.anchor = new THREE.Vector3(e, t, a), this.effectradius = n, this.map = new Map, this.geometry = null, this.surround = function (e) {
    for (var t, a = 0, n = (this.geometry = e).vertices.length; a < n; a++)
      if (!(a % 100 == 0 || a % 100 == 99 || a < 100 || 9900 < a && a < 1e4) && (t = e.vertices[a].distanceTo(this.anchor)) < this.effectradius) {
        var o = t / this.effectradius,
          i = 1 / (.25 * Math.sqrt(6.28)) * Math.exp(-o * o / .125) / 1.6;
        this.map.set(a, i)
      }
  }, this.moveTo = function (e, t, a) {
    var n = this.geometry;
    if (this.anchor.x !== e || this.anchor.y !== t || this.anchor.z !== a) {
      var o = e - this.anchor.x,
        i = t - this.anchor.y,
        r = a - this.anchor.z;
      this.map.forEach(function (e, t, a) {
        n.vertices[t].x += o * e, n.vertices[t].y += i * e, n.vertices[t].z += r * e
      }), this.anchor.set(e, t, a)
    }
  }
}

function surfaceRandomConvex() {
  for (var e = 0, t = 0; t < 2; t++)
    for (var a = 0; a < 2; a++) {
      var n = .5 < Math.random() ? 1 : -1,
        o = Math.random() * canvasW / 2 * Math.pow(-1, t),
        i = Math.random() * canvasH / 2 * Math.pow(-1, a),
        r = 300 * Math.random() + 450;
      PaintData.pattern.morphdata["" + e++] = {
        anchorX: o,
        anchorY: i,
        anchorZ: 0,
        anchorRadius: r,
        moveToX: o + n * (300 * Math.random() + 150),
        moveToY: i + n * (200 * Math.random() + 100)
      }
    }
}
Grid.prototype.make = function () {
  for (var e = 0; e < this.znum; ++e)
    for (var t = 0; t < this.ynum; ++t)
      for (var a = 0; a < this.xnum; ++a) {
        var n = a * this.unitsize_width - this.totalWidth / 2,
          o = t * this.unitsize_height - this.totalHeight / 2,
          i = e * this.unitsize_depth - this.totalDepth / 2,
          r = new THREE.Vector3(n, o, i);
        this.matrix.push(r)
      }
};
var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

function dataURLtoBlob(e) {
  for (var t = e.split(","), a = t[0].match(/:(.*?);/)[1], n = atob(t[1]), o = n.length, i = new Uint8Array(o); o--;) i[o] = n.charCodeAt(o);
  return new Blob([i], {
    type: a
  })
}
String.prototype.colorRgb = function (e) {
    var t = this.toLowerCase();
    if (t && reg.test(t)) {
      if (4 === t.length) {
        for (var a = "#", n = 1; n < 4; n += 1) a += t.slice(n, n + 1).concat(t.slice(n, n + 1));
        t = a
      }
      var o = [];
      for (n = 1; n < 7; n += 2) o.push(parseInt("0x" + t.slice(n, n + 2)));
      return "rgba(" + o.join(",") + "," + e + ")"
    }
    return t
  },
  function (e, t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : e.download = t()
  }(this, function () {
    return function t(e, a, n) {
      function o(e) {
        return String(e)
      }
      var i, r, s = window,
        l = "application/octet-stream",
        d = n || l,
        u = e,
        c = !a && !n && u,
        f = document.createElement("a"),
        h = s.Blob || s.MozBlob || s.WebKitBlob || o,
        p = a || "download";
      if (h = h.call ? h.bind(s) : Blob, "true" === String(this) && (d = (u = [u, d])[0], u = u[1]), c && c.length < 2048 && (p = c.split("/").pop().split("?")[0], f.href = c, -1 !== f.href.indexOf(c))) {
        var m = new XMLHttpRequest;
        return m.open("GET", c, !0), m.responseType = "blob", m.onload = function (e) {
          t(e.target.response, p, l)
        }, setTimeout(function () {
          m.send()
        }, 0), m
      }
      if (/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(u)) {
        if (!(2096103.424 < u.length && h !== o)) return navigator.msSaveBlob ? navigator.msSaveBlob(_(u), p) : g(u);
        d = (u = _(u)).type || l
      }

      function _(e) {
        for (var t = e.split(/[:;,]/), a = t[1], n = ("base64" == t[2] ? atob : decodeURIComponent)(t.pop()), o = n.length, i = 0, r = new Uint8Array(o); i < o; ++i) r[i] = n.charCodeAt(i);
        return new h([r], {
          type: a
        })
      }

      function g(e, t) {
        if ("download" in f) return f.href = e, f.setAttribute("download", p), f.className = "download-js-link", f.innerHTML = "downloading...", f.style.display = "none", document.body.appendChild(f), setTimeout(function () {
          f.click(), document.body.removeChild(f), !0 === t && setTimeout(function () {
            s.URL.revokeObjectURL(f.href)
          }, 250)
        }, 66), !0;
        if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) return e = e.replace(/^data:([\w\/\-\+]+)/, l), window.open(e) || confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.") && (location.href = e), !0;
        var a = document.createElement("iframe");
        document.body.appendChild(a), t || (e = "data:" + e.replace(/^data:([\w\/\-\+]+)/, l)), a.src = e, setTimeout(function () {
          document.body.removeChild(a)
        }, 333)
      }
      if (i = u instanceof h ? u : new h([u], {
          type: d
        }), navigator.msSaveBlob) return navigator.msSaveBlob(i, p);
      if (s.URL) g(s.URL.createObjectURL(i), !0);
      else {
        if ("string" == typeof i || i.constructor === o) try {
          return g("data:" + d + ";base64," + s.btoa(i))
        } catch (e) {
          return g("data:" + d + "," + encodeURIComponent(i))
        }(r = new FileReader).onload = function (e) {
          g(this.result)
        }, r.readAsDataURL(i)
      }
      return !0
    }
  });